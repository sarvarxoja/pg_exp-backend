import mongoose from "mongoose";
import { Schema } from "mongoose";

const Users = new Schema({
  avatar: {
    type: String,
    default: null,
  },

  profile_banner: {
    type: String,
    default: null,
  },

  username: {
    type: String,
    require: true,
    unique: true,
  },

  name: {
    type: String,
    require: false,
  },

  last_name: {
    type: String,
    require: false,
  },

  email: {
    type: String,
    require: false,
    unique: true,
  },

  password: {
    type: String,
    require: false,
  },

  is_admin: {
    type: Boolean,
    default: false,
  },

  is_blocked: {
    type: Boolean,
    default: false,
  },

  last_login: {
    type: Date,
    default: Date,
  },

  is_shop: {
    type: Boolean,
    default: false,
  },

  is_famous: {
    type: Boolean,
    default: false,
  },

  checkmark: {
    type: String,
    default: null,
  },

  user_bio: {
    type: String,
    default: null,
  },
});

export const UserModel = mongoose.model("Users", Users);
