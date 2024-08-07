const asyncHandler = require("express-async-handler");
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const { Op, Sequelize, where } = require("sequelize");

// Create
const createPropertyType = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const response = await db.PropertyType.findOrCreate({
    where: { name },
    defaults: req.body,
  });
  return res.json({
    success: response[1],
    mes: response[1] ? "Created." : "Name property duplicated.",
    propertyType: response[0],
  });
});

// Get
const getPropertyTypes = asyncHandler(async (req, res) => {
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
  if (name)
    query.name = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("name")),
      "LIKE",
      `%${name.toLocaleLowerCase()}%`
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

  //
  if (!limit) {
    const response = await db.PropertyType.findAll({
      where: query,
      ...options,
    });
    return res.json({
      success: response.length > 0,
      mes: response.length > 0 ? "Got." : "Cannot get propertyTypes.",
      propertyType: response,
    });
  }

  //Phân trang
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const offset = (prevPage - 1) * limit;
  if (offset) options.offset = offset;
  options.limit = +limit;

  const response = await db.PropertyType.findAndCountAll({
    where: query,
    ...options,
  });

  return res.json({
    success: response.length > 0,
    mes: response.length > 0 ? "Got." : "Cannot get propertyTypes.",
    propertyType: response,
  });
});

//Update
const updatePropertyType = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (Object.keys(req.body).length === 0)
    return throwErrorWithStatus(403, "Cần ít nhất 1 trường.", res, next);

  const response = await db.PropertyType.update(req.body, {
    where: { id },
  });

  return res.json({
    success: response[0] > 0,
    mes:
      response[0] > 0
        ? "Cập nhật thành công."
        : " Không tìm thấy dữ liệu trùng khớp.",
  });
});

//Delete
const deletePropertyType = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const response = await db.PropertyType.destroy({
    where: { id },
  });

  return res.json({
    success: response > 0,
    mes:
      response > 0 ? "Xóa thành công." : " Không tìm thấy dữ liệu trùng khớp.",
  });
});

module.exports = {
  createPropertyType,
  getPropertyTypes,
  updatePropertyType,
  deletePropertyType,
};
