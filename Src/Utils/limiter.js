import rateLimit from "express-rate-limit";

const registerLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 3,
  message: (req, res) => {
    return res.status(429).json({
      msg: "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
      status: 429,
    });
  },
});

const shopLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 2,
  message: (req, res) => {
    return res.status(429).json({
      msg: "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
      status: 429,
    });
  },
});

export { registerLimiter, shopLimiter };
