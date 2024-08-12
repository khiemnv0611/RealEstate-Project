// const redis = require("../config/redis.config");

// const rateLimiter = async (req, res, next) => {
//   const clientId = req.headers?.client_Id;

//   const currentTime = Date.now(); // Trả về ms

//   const client = await redis.hGetAll(`ratelimit-${clientId}`);

//   if (Object.keys(client).length === 0) {
//     await redis.hSet(`ratelimit-${clientId}`, "createdAt", currentTime);
//     await redis.hSet(`ratelimit-${clientId}`, "count", 1);

//     return next();
//   }

//   let difference = (currentTime - +client.createdAt) / 1000;

//   if (difference >= +process.env.RATE_LIMIT_RESET) {
//     await redis.hSet(`ratelimit-${clientId}`, "createdAt", currentTime);
//     await redis.hSet(`ratelimit-${clientId}`, "count", 1);

//     return next();
//   }

//   if (client.count > +process.env.RATE_LIMIT_COUNT) {
//     return res.status(429).json({
//       success: false,
//       mes: "Bạn đã thực hiện quá nhiều lần. Vui lòng thử lại sau ít phút!",
//     });
//   } else {
//     await redis.hSet(`ratelimit-${clientId}`, "count", +client.count + 1);
//     return next();
//   }
// };
// module.exports = rateLimiter;
