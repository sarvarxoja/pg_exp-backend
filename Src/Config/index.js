import mongoose from "mongoose";

let connection = await mongoose
  .connect("mongodb://127.0.0.1:27017/uc-exp")
  .then((e) => console.log("succest"))
  .catch((error) => console.log(error));

export default connection;
