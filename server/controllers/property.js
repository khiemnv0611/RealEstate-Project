const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Sequelize, Op, DATE, where } = require("sequelize");

const Status = {
  ACCEPT: "Đã duyệt",
  REJECT: "Bị hủy",
  WAITING: "Chờ duyệt",
};

module.exports = {
  // CREATE NEW PROPERTY
  createNewProperty: asyncHandler(async (req, res) => {
    console.log("Request Body:", req.body);

    const { uid } = req.user;
    const {
      name,
      description,
      address,
      city,
      listingType,
      price,
      propertyTypeId,
      images,
      featuredImage,
      bedRoom,
      bathRoom,
      propertySize,
      yearBuilt,
    } = req.body;

    if (
      !name ||
      !description ||
      !address ||
      !city ||
      !listingType ||
      !price ||
      !propertyTypeId
    ) {
      return res.status(400).json({
        success: false,
        mes: "Please provide all required fields.",
      });
    }

    // Check if propertyTypeId exists
    const propertyType = await db.PropertyType.findByPk(propertyTypeId);
    if (!propertyType) {
      return res.status(404).json({
        success: false,
        mes: "Property type does not exist.",
      });
    }

    if (images && !Array.isArray(images)) {
      return res.status(400).json({
        success: false,
        mes: "Images must be an array.",
      });
    }

    try {
      // Fetch user's current membership plan and post limit
      const user = await db.User.findByPk(uid, {
        include: [{ model: db.MembershipPlans, as: "membershipPlan" }],
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          mes: "User not found.",
        });
      }

      const postLimit = user.membershipPlan.postLimit;

      // Count the number of properties the user has already posted
      const propertyCount = await db.Property.count({
        where: {
          owner: uid,
          status: { [Op.ne]: "Bị hủy" },
        },
      });

      // Check if the user has exceeded their post limit
      if (propertyCount >= postLimit) {
        return res.status(400).json({
          success: false,
          mes: `Bạn đã vượt quá giới hạn bài đăng là ${postLimit} bài.`,
        });
      }

      const status = "Chờ duyệt";
      const isAvailable = true;
      const imageArray = Array.isArray(images) ? images : [];
      console.log("TEST: ", typeof images);

      // Create the property
      const newProperty = await db.Property.create({
        name: name,
        description: description,
        address: address,
        city: city,
        listingType: listingType,
        price: price,
        propertyTypeId: propertyTypeId,
        status: status,
        isAvailable: isAvailable,
        featuredImage: featuredImage,
        images: imageArray,
        bedRoom: bedRoom,
        bathRoom: bathRoom,
        propertySize: propertySize,
        yearBuilt: yearBuilt,
        owner: uid,
        postedBy: uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (uid) {
        const roleCode = "ROL3";

        const existingRole = await db.User_Role.findOne({
          where: {
            userId: uid,
            roleCode: roleCode,
          },
        });

        if (!existingRole) {
          const roleCodeBulk = {
            userId: uid,
            roleCode: roleCode,
          };

          const updateRole = await db.User_Role.create(roleCodeBulk);

          if (!updateRole) {
            await db.User.destroy({ where: { id: uid } });
          }
        }
      }

      return res.status(201).json({
        success: true,
        mes: "Bài đăng đã được tạo thành công, vui lòng chờ quản trị viên phê duyệt trước khi hiển thị.",
        property: newProperty,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        mes: "An error occurred while creating the property.",
        error: error.message,
      });
    }
  }),
  getProperties: asyncHandler(async (req, res) => {
    const {
      limit,
      page,
      fields,
      name,
      sort,
      address,
      city,
      price,
      listingType,
      ...query
    } = req.query;
    const options = {};

    query.status = "Đã duyệt";

    // Giá
    if (price) {
      const isBetweenFilter = price?.every((el) => !isNaN(el));

      if (isBetweenFilter) {
        query.price = { [Op.between]: price };
      } else {
        const number = price?.find((el) => !isNaN(el));
        const operator = price?.find((el) => isNaN(el)); // `lte` or `gte`

        if (number !== undefined && operator !== undefined) {
          query.price = { [Op[operator]]: number };
        }
      }
    }

    // Lọc theo loại "Bán", "Cho thuê" hoặc cả hai
    if (listingType && listingType !== "ALL") {
      query.listingType = listingType;
    }

    // Giới hạn trường
    if (fields) {
      const attributes = fields.split(",");
      const isExclude = attributes.some((el) => el.startsWith("-"));
      if (isExclude)
        options.attributes = {
          exclude: attributes.map((el) => el.replace("-", "")),
        };
      else options.attributes = attributes;
    }

    // Tìm kiếm theo tên
    if (address)
      query.address = Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("Property.address")),
        "LIKE",
        `%${address.toLocaleLowerCase()}%`
      );

    if (city)
      query.city = Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("Property.city")),
        "LIKE",
        `%${city.toLocaleLowerCase()}%`
      );

    //Sắp xếp
    if (sort) {
      const order = sort
        .split(",")
        .map((el) =>
          el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
        );
      options.order = order;
    }

    // Set limit
    if (!limit) {
      //Redis
      // const alreadyGetAll = await redis.get("get-properties");
      // if (alreadyGetAll)
      //   return res.json({
      //     success: true,
      //     mes: "Got.",
      //     properties: JSON.parse(alreadyGetAll),
      //   });

      const response = await db.Property.findAll({
        where: query,
        ...options,
      });

      // redis.set("get-properties", JSON.stringify(response));

      return res.json({
        success: response.length > 0,
        mes: response.length > 0 ? "Got." : "Cannot get properties.",
        properties: response,
      });
    }

    // Phân trang
    const offset = (page && +page > 1 ? +page - 1 : 0) * limit;
    if (offset) options.offset = offset;
    options.limit = +limit;

    const response = await db.Property.findAndCountAll({
      where: query,
      ...options,
      include: [
        {
          model: db.User,
          as: "rPostedBy",
          attributes: ["id", "avatar", "phone", "name", "email"],
        },
        {
          model: db.User,
          as: "rOwner",
          attributes: ["id", "avatar", "phone", "name", "email"],
          // include: [{
          //   model: db.User_Role,
          //   as: "roles",
          //   attributes: ["roleCode"],
          //   include: [{
          //     model: db.Role,
          //     as: "roleName",
          //     attributes: ["code", "value"],
          //   }]
          // }]
        },
        {
          model: db.PropertyType,
          as: "rPropertyType",
          attributes: ["name", "id"],
        },
      ],
    });

    return res.json({
      success: Boolean(response),
      mes: response ? "Got." : "Cannot get properties.",
      properties: response
        ? { ...response, limit: +limit, page: +page ? +page : 1 }
        : null,
    });
  }),
  getPropertiesWithoutPagination: asyncHandler(async (req, res) => {
    try {
      const response = await db.Property.findAndCountAll({
        include: [
          {
            model: db.User,
            as: "rPostedBy",
            attributes: ["id", "avatar", "phone", "name", "email"],
            include: [
              {
                model: db.User_Role,
                attributes: ["roleCode"],
                as: "userRoles",
                include: [
                  {
                    model: db.Role,
                    as: "roleName",
                    attributes: ["value"],
                  },
                ],
              },
            ],
          },
          {
            model: db.User,
            as: "rOwner",
            attributes: ["id", "avatar", "phone", "name", "email"],
            include: [
              {
                model: db.User_Role,
                attributes: ["roleCode"],
                as: "userRoles",
                include: [
                  {
                    model: db.Role,
                    as: "roleName",
                    attributes: ["value"],
                  },
                ],
              },
              {
                model: db.MembershipPlans,
                attributes: ["id", "name", "duration", "postLimit", "postDate"],
                as: "membershipPlan",
              },
            ],
          },
          {
            model: db.PropertyType,
            as: "rPropertyType",
            attributes: ["name", "id"],
          },
        ],
      });

      return res.json({
        success: true,
        mes: response ? "Got." : "Cannot get properties.",
        properties: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        mes: "An error occurred while fetching the properties.",
        error: error.message,
      });
    }
  }),
  getOneById: asyncHandler(async (req, res) => {
    const { propertyId } = req.params;
    const response = await db.Property.findByPk(propertyId, {
      include: [
        {
          model: db.PropertyType,
          as: "rPropertyType",
          attributes: ["name", "id"],
        },
        {
          model: db.User,
          as: "rPostedBy",
          attributes: ["name", "phone", "avatar", "email"],
        },
        {
          model: db.User,
          as: "rOwner",
          attributes: ["name", "phone", "avatar", "email"],
        },
      ],
    });
    return res.json({
      success: !!response,
      mes: response ? "Got." : "Cannot get property.",
      data: response,
    });
  }),
  deletePropertyById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { uid } = req.user;
    console.log(id);
    const property = await db.Property.findByPk(id, {
      include: [
        {
          model: db.PropertyType,
          as: "rPropertyType",
          attributes: ["name", "id"],
        },
        {
          model: db.User,
          as: "rPostedBy",
          attributes: ["name", "phone", "avatar"],
        },
        {
          model: db.User,
          as: "rOwner",
          attributes: ["name", "phone", "avatar"],
        },
      ],
    });

    console.log(property);

    if (!property) {
      return res.status(404).json({
        success: false,
        mes: "Property not found.",
      });
    }

    if (property.owner != uid) {
      return res.status(403).json({
        success: false,
        mes: "You don't own this property.",
      });
    }

    await property.update(
      {
        status: "Bị hủy",
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      mes: "Delete property successfully.",
    });
  }),
  getPropertiesByUserId: asyncHandler(async (req, res) => {
    const { uid } = req.user;

    try {
      const response = await db.Property.findAndCountAll({
        where: {
          owner: uid,
        },
        include: [
          {
            model: db.PropertyType,
            as: "rPropertyType",
            attributes: ["name", "id"],
          },
          {
            model: db.User,
            as: "rPostedBy",
            attributes: ["name", "phone", "avatar"],
          },
          {
            model: db.User,
            as: "rOwner",
            attributes: ["name", "phone", "avatar"],
          },
        ],
      });

      return res.json({
        success: !!response,
        mes: response.rows.length ? "Got properties." : "No properties found.",
        properties: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        mes: "An error occurred while retrieving the properties.",
        error: error.message,
      });
    }
  }),
  getPropertyComments: asyncHandler(async (req, res) => {
    const { propertyId } = req.params;

    try {
      const submissions = await db.Submission.findAll({
        where: { propertyId: propertyId },
      });

      if (!submissions || submissions.length === 0) {
        return res.json({
          success: false,
          mes: "No comments found for this property.",
        });
      }

      const uids = submissions.map((submission) => submission.uid);

      const users = await db.User.findAll({
        where: {
          id: uids,
        },
        attributes: ["id", "name", "avatar"],
      });

      const userMap = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});

      const commentsWithReplies = await Promise.all(
        submissions.map(async (submission) => {
          const replyComments = await db.Comment.findAll({
            where: { parentComment: submission.id },
          });

          const replyUids = replyComments.map((reply) => reply.uid);

          const replyUsers = await db.User.findAll({
            where: {
              id: replyUids,
            },
            attributes: ["id", "name", "avatar"],
          });

          const replyUserMap = replyUsers.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
          }, {});

          const repliesWithUsers = replyComments.map((reply) => ({
            ...reply.toJSON(),
            rCommentedBy: replyUserMap[reply.uid] || null,
          }));

          return {
            ...submission.toJSON(),
            rCommentedBy: userMap[submission.uid] || null,
            replies: repliesWithUsers,
          };
        })
      );

      return res.json({
        success: true,
        mes: "Got comments for the property.",
        data: {
          count: submissions.length,
          rows: commentsWithReplies,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        mes: "An error occurred while retrieving the properties.",
        error: error.message,
      });
    }
  }),
  updatePropertyStatus: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const { uid } = req.user;

    try {
      const response = await db.Property.findByPk(id);

      response.status = status;

      await response.save()

      if (response) {
        const message =
          status == Status.ACCEPT || status == Status.REJECT
            ? "Bài đăng của bạn đã được duyệt, nhấn để xem bài đăng"
            : "Bài đăng của bạn không được xét duyệt";

        const notify = db.Notification.create({
          message: message,
          senderId: uid,
          receiverId: response.owner,
          propertyId: req.params.id,
        });

        console.log(notify);

        return res.json({
          success: true,
          mes: "Update successfully.",
          data: response,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        mes: "An error occurred while updating the property.",
        error: error.message,
      });
    }
  }),
  updatePropertiesStatus: asyncHandler(async (req, res) => {
    const { propertyIds, status } = req.body;
    const { uid } = req.user;

    try {
      // Duyệt qua từng property trong mảng propertyIds
      for (const propertyId of propertyIds) {
        const property = await db.Property.findByPk(propertyId);

        if (property) {
          await property.update({
            status: status,
          });

          const message =
            status == Status.ACCEPT || status == Status.REJECT
              ? "Bài đăng của bạn đã được duyệt, nhấn để xem bài đăng"
              : "Bài đăng của bạn không được xét duyệt";

          const notify = db.Notification.create({
            message: message,
            senderId: uid,
            receiverId: property.owner,
            propertyId: propertyId,
          });

          console.log(notify);
        } else {
          console.log(`Không tìm thấy property với ID: ${propertyId}`);
        }
      }

      return res.json({
        success: true,
        message: "Cập nhật trạng thái thành công cho các property.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi khi cập nhật trạng thái các property.",
        error: error.message,
      });
    }
  }),
  getPropetiesCount: asyncHandler(async (req, res) => {
    try {
      const response = await db.Property.count();

      return res.json({
        success: true,
        mes: response ? "Got." : "Cannot get properties.",
        count: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        mes: "An error occurred while fetching the properties.",
        error: error.message,
      });
    }
  }),
};
