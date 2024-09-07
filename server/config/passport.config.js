const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../models");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // User tồn tại, không cần tạo
                let user = await db.User.findOne({
                    where: { email: profile.emails[0].value },
                });

                if (!user) {
                    user = await db.User.create({
                        email: profile.emails[0].value,
                        name: profile.displayName,
                        avatar: profile.photos[0].value,
                        password: "user-with-google", // Đăng nhập bằng gg, không cần mật khẩu
                    });

                    const userId = user.id;
                    console.log(userId)
                    if (userId) {
                        const roleCode = ["ROL7"];
                        const roleCodeBulk = roleCode.map((role) => ({ userId, roleCode: role }));
                        const updateRole = await db.User_Role.bulkCreate(roleCodeBulk);
                        if (!updateRole) await db.User.destroy({ where: { id: userId } });
                    }
                }
                return done(null, user);
            } catch (err) {
                console.error(err);
                return done(err, null);
            }
        }
    )
);