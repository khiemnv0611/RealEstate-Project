const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Sequelize, Op, DATE } = require("sequelize");

module.exports = {
  // CREATE NEW PROPERTY
  createNewProperty: asyncHandler(async (req, res) => {
    console.log("Request Body:", req.body);

    const { uid } = req.user;
    const {
      name, description, address, city, listingType, price, propertyTypeId, images, featuredImage,
      bedRoom, bathRoom, propertySize, yearBuilt
    } = req.body;

    if (!name || !description || !address || !city || !listingType || !price || !propertyTypeId) {
      return res.status(400).json({
        success: false,
        mes: "Please provide all required fields."
      });
    }

    // Check if propertyTypeId exists
    const propertyType = await db.PropertyType.findByPk(propertyTypeId);
    if (!propertyType) {
      return res.status(404).json({
        success: false,
        mes: "Property type does not exist."
      });
    }

    if (images && !Array.isArray(images)) {
      return res.status(400).json({
        success: false,
        mes: "Images must be an array."
      });
    }

    try {
      const status = 'Chờ duyệt';
      const isAvailable = true;
      const imageArray = Array.isArray(images) ? images : [];
      console.log("TEST: ", typeof images)
      
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
        updatedAt: new Date()
      });

      if (uid) {
        const roleCode = ["ROL3"];
        const roleCodeBulk = roleCode.map((role) => ({ userId: uid, roleCode: role }));
        const updateRole = await db.User_Role.bulkCreate(roleCodeBulk);
        if (!updateRole) await db.User.destroy({ where: { id: uid } });
      }

      return res.status(201).json({
        success: true,
        mes: "Property created successfully.",
        property: newProperty
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        mes: "An error occurred while creating the property.",
        error: error.message
      });
    }
  }),
  getProperties: asyncHandler(async (req, res) => {
    const { limit, page, fields, name, sort, address, city, price, ...query } =
      req.query;
    const options = {};

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
          attributes: ["avatar", "phone", "name", "email"],
        },
        {
          model: db.User,
          as: "rOwner",
          attributes: ["avatar", "phone", "name", "email"],
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
      mes: response ? "Got." : "Cannot get property.",
      data: response,
    });
  }),
};
