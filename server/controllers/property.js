const asyncHandler = require("express-async-handler");
const db = require("../models");

module.exports = {
  createNewProperty: asyncHandler(async (req, res) => {
    const response = await db.User.create;
    return res.json({
      success: Boolean(response),
      mes: response ? "Got." : "Cannot get user.",
      currentUser: response,
    });
  }),
  getProperties: asyncHandler(async (req, res) => {
    const { limit, page, fields, name, sort, ...query } = req.query;
    const options = {};

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
    // if (name)
    //   query.name = Sequelize.where(
    //     Sequelize.fn("LOWER", Sequelize.col("name")),
    //     "LIKE",
    //     `%${name.toLocaleLowerCase()}%`
    //   );

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

    //Phân trang
    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const offset = (prevPage - 1) * limit;
    if (offset) options.offset = offset;
    options.limit = +limit;

    const response = await db.Property.findAndCountAll({
      where: query,
      ...options,
    });

    return res.json({
      success: response.rows.length > 0,
      mes: response.rows.length > 0 ? "Got." : "Cannot get properties.",
      properties: response.rows,
    });
  }),
};
