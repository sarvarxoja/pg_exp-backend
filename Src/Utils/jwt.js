import jwt from "jsonwebtoken";

export async function jwtSign(id, is_admin, is_shop) {
  try {
    const SECRET_KEY = process.env.SECRET_KEY;
    const expiresIn = 7 * 24 * 60 * 60;
    let jwtData = jwt.sign(
      { id: id, is_admin: is_admin, is_shop: is_shop }, SECRET_KEY, {expiresIn}
    );

    return jwtData;
  } catch (error) {
    console.log(error.message);
  }
}