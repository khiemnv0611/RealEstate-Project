const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Sequelize, Op } = require("sequelize");

module.exports = {
  // createNewProperty: asyncHandler(async (req, res) => {
  //   const response = await db.User.create;
  //   return res.json({
  //     success: Boolean(response),
  //     mes: response ? "Got." : "Cannot get user.",
  //     currentUser: response,
  //   });
  // }),
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
          attributes: ["name", "image"],
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
