const asyncHandler = require("express-async-handler");
const db = require("../models");

module.exports = {
    // CREATE MEMBERSHIP
    createPlan: asyncHandler(async (req, res) => {
        const { name, price, description, postLimit, duration, postDate } = req.body;

        try {
            const plan = await db.MembershipPlans.create(
                {
                    name, price, description, postLimit, duration, postDate
                }
            )

            return res.json({
                success: Boolean(plan),
                mes: "Plan created",
                plan: plan
            });
        } catch (error) {
            return res.json({
                success: false,
                mes: error.message,
            });
        }
    }),
    // GET ALL PLANS
    getAllPlans: asyncHandler(async (req, res) => {
        try {
            const plans = await db.MembershipPlans.findAll()
            return res.json({
                success: Boolean(plans),
                mes: "Plans retrieved",
                plans: plans
            });
        } catch (error) {
            return res.json({
                success: false,
                mes: error.message,
            });
        }
    }),
    registerPlan: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { uid } = req.user;

        try {
            const plan = await db.MembershipPlans.findByPk(id)

            if (!plan) {
                return res.json({
                    success: false,
                    mes: "Plan Not Found"
                });
            }

            const user = await db.User.findByPk(uid)

            if (!user) {
                return res.json({
                    success: false,
                    mes: "User Not Found"
                });
            }

            if (user.membershipPlansId != 1) {
                return res.json({
                    success: false,
                    mes: "User already has a plan"
                });
            }

            if (user.balance < plan.price) {
                return res.json({
                    success: false,
                    mes: "User's balance is not enough to register this plan"
                });
            }

            const response = await db.User.update(
                {
                    membershipPlansId: plan.id,
                    balance: user.balance - plan.price,
                    planRegisterDate: new Date()
                },
                { where: { id: uid } }
            )

            if (response) {
                await db.Transactions.create({
                    name: user.name,
                    amount: plan.price,
                    paymentMethod: 'Account',
                    transactionsType: 'Mua gói',
                    userId: user.id,
                    membershipPlansId: plan.id,
                });

                return res.json({
                    success: true,
                    mes: "Successfully register!",
                });
            } else {
                return res.json({
                    success: false,
                    mes: "Register failed!",
                });
            }

        } catch (error) {
            return res.json({
                success: false,
                mes: error.message,
            });
        }
    })
}