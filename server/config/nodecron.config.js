const cron = require('node-cron');
const db = require("../models");
const { Op } = require('sequelize');
const { getPropertiesWithoutPagination } = require('../controllers/property');
const property = require('../controllers/property');

const startCron = () => {
    cron.schedule('* * * * *', async () => {
        try {
            // UPDATE USER'S PLAN
            // Find all user has plan is not default
            const users = await db.User.findAll({
                where: {
                    membershipPlansId: { [Op.ne]: 1 }
                },
                include: [{ model: db.MembershipPlans, as: 'membershipPlan' }]
            });

            const now = new Date();

            for (const user of users) {
                const planRegisterDate = new Date(user.planRegisterDate);
                const expirationDate = new Date(
                    planRegisterDate.getTime() + user.membershipPlan.duration * 24 * 60 * 60 * 1000
                );

                if (now > expirationDate) {
                    // Update user's membership to default plan (id = 1)
                    await db.User.update(
                        { membershipPlansId: 1 },
                        { where: { id: user.id } }
                    );
                    console.log(`User ${user.id}'s membership plan has expired. Reverted to default.`);
                }
            }

            // UPDATE POST EXPIRED DATE
            const properties = await db.Property.findAll({
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
                        model: db.MembershipPlans,
                        attributes: ["id", "name", "duration", "postLimit", "postDate"],
                        as: "membershipPlan",
                      },
                    ]
                  },
                ],
              });
            
            for(const property of properties) {
                const updatedAt = new Date(property.updatedAt);
                const expirationDate = new Date(
                    updatedAt.getTime() + property.rOwner.membershipPlan.postDate * 24 * 60 * 60 * 1000
                );

                if (now > expirationDate) {
                    // Update user's membership to default plan (id = 1)
                    await db.Property.update(
                        { status: "Bị hủy" },
                        { where: { id: property.id } }
                    );
                    console.log(`Property ${property.id}'s membership plan has expired. Reverted to default.`);
                }
            }
        } catch (error) {
            console.error('Error checking membership expiration:', error);
        }
    });
}

module.exports = startCron;

