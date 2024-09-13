const asyncHandler = require("express-async-handler");
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const { raw } = require("express");
const property = require("./property");

// //Lấy user
// const getCurrent = asyncHandler(async (req, res) => {
//   //DTO
//   const { uid } = req.user;
//   //Handle logic
//   const response = await db.User.findByPk(uid, {
//     attributes: {
//       exclude: ["password"],
//     },
//   });

//   return res.json({
//     success: Boolean(response),
//     mes: response ? "Got." : "Cannot get user.",
//     currentUser: response,
//   });
// });

// const getRoles = asyncHandler(async (req, res) => {
//   const response = await db.Role.findAll();
//   return res.json({
//     success: Boolean(response),
//     mes: response ? "Got." : "Cannot get roles.",
//     roles: response,
//   });
// });

// USER CONTROLLER
module.exports = {
  getCurrent: asyncHandler(async (req, res) => {
    const { uid } = req.user;
    const response = await db.User.findByPk(uid, {
      attributes: {
        exclude: ["password"],
      },
      // Lấy trong 2 model
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
    });
    return res.json({
      success: Boolean(response),
      mes: response ? "Got." : "Cannot get user.",
      currentUser: response,
    });
  }),
  getRoles: asyncHandler(async (req, res) => {
    const response = await db.Role.findAll({
      attributes: ["code", "value"],
    });
    return res.json({
      success: Boolean(response),
      mes: response ? "Got." : "Cannot get roles.",
      roles: response,
    });
  }),
  updateProfile: asyncHandler(async (req, res) => {
    const { name, email, address, avatar, phone } = req.body;
    const updateData = new Object();
    const { uid } = req.user;

    console.log(req.body)

    if (email) {
      const userRoles = await db.User_Role.findAll({
        where: { userId: uid },
        raw: true,
      });
      if (userRoles.length === 1 && userRoles[0].roleCode === "ROL7") {
        updateData.email = email;
      }
    }

    if (avatar && avatar.length > 0) updateData.avatar = avatar[0];
    if (name) updateData.name = name;
    if (address) updateData.address = address;
    if (phone) updateData.phone = phone;

    console.log(updateData)

    // CHECK
    // try {
    //   const response = await db.User.update(updateData, { where: { id: uid } });

    // } catch(e) {
    //   console.log(e)
    // }

    const response = await db.User.update(updateData, { where: { id: uid } });

    return res.json({
      success: response[0] > 0,
      mes:
        response[0] > 0 ? "Cập nhật thành công." : "Cập nhật không thành công.",
    });
  }),
  addPropertyToWish: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { uid } = req.user;

    try {
      const existingWish = await db.WishList.findOne({
        where: { uid: uid, propertyId: id },
      });
  
      if (existingWish) {
        await existingWish.destroy();
        return res.status(200).json({
          success: true,
          message: "Property removed from wishlist successfully!",
        });
      }
  
      const wish = await db.WishList.create({
        uid: uid,
        propertyId: id,
      });
  
      return res.status(201).json({
        success: true,
        message: "Property added to wishlist successfully!",
        data: wish,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request.",
        error: error.message,
      });
    }
  }),
  checkIsPropertyInWishList: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { uid } = req.user;

    try {
      const isInWishList = await db.WishList.findOne({
        where: {
          propertyId: id,
          uid: uid
        }
      });
  
      if (isInWishList) {
        return res.status(200).json({
          success: true,
          isInWishList: true
        });
      } else {
        return res.status(200).json({
          success: true,
          isInWishList: false
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi kiểm tra danh sách yêu thích",
        error: error.message
      });
    }
  }),
  getWishListByUser: asyncHandler(async (req, res) => {
    const { uid } = req.user;

    try {
      const wishlistEntries = await db.WishList.findAll({
        where: { uid: uid },
        attributes: ["propertyId"],
      });
  
      if (wishlistEntries.length > 0) {
        const propertyDetails = [];
  
        for (let entry of wishlistEntries) {
          const property = await db.Property.findByPk(entry.propertyId, {
            attributes: { exclude: [] },
            include: [
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
  
          if (property) {
            propertyDetails.push(property);
          }
        }
  
        return res.status(200).json({
          success: true,
          wishlist: propertyDetails,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "No properties found in wishlist.",
          wishlist: [],
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching the wishlist.",
        error: error.message,
      });
    }  
  }),
  commentToProperty: asyncHandler(async (req, res) => {
    const { uid } = req.user;
    const { message, receiverId } = req.body;

    try {
      const submission = db.Submission.create({
        uid: uid,
        propertyId: req.params.id,
        message: message,
      })

      if (submission) {
        if (receiverId != uid) {
          const sender = await db.User.findByPk(uid, {
            attributes: {
              exclude: ["password"],
            }
          });
  
          const message = sender.name + " vừa bình luận vào bải viết của bạn"
  
          const notify = db.Notification.create({
            message: message,
            senderId: uid,
            receiverId: receiverId,
            propertyId: req.params.id
          })
  
          console.log(notify)
        }

        return res.status(200).json({
          success: true,
          message: "Comment submitted successfully.",
          submission: submission
        })
      }
      else {
        return res.status(500).json({
          success: false,
          message: "Error occurred"
        })
      }
    } catch(error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while submiting.",
        error: error.message,
      })
    }
  }),
  replyComment: asyncHandler(async (req, res) => {
    const { uid } = req.user;
    const { message, propertyId, receiverId } = req.body;

    try {
      const comment = db.Comment.create({
        uid: uid,
        propertyId: propertyId,
        parentComment: req.params.id,
        text: message
      })

      if (comment) {
        if (receiverId != uid) {
          const sender = await db.User.findByPk(uid, {
            attributes: {
              exclude: ["password"],
            }
          });
  
          const message = sender.name + " vừa trả lời bình luận của bạn"
  
          const notify = db.Notification.create({
            message: message,
            senderId: uid,
            receiverId: receiverId,
            propertyId: req.params.id
          })
  
          console.log(notify)
        }

        return res.status(200).json({
          success: true,
          message: "Comment submitted successfully.",
          submission: comment
        })
      }
      else {
        return res.status(500).json({
          success: false,
          message: "Error occurred"
        })
      }
    } catch(error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while submiting.",
        error: error.message,
      })
    }
  }),
};
