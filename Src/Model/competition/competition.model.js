import mongoose, { Schema } from "mongoose";

const Competition = new Schema({
  cm_banner: {
    type: String,
    requeired: true,
  },

  cm_sponsors: {
    type: String,
  },

  cm_map: {
    type: String,
    required: true,
  },

  cm_type: {
    type: String,
    required: true,
  },

  cm_name: {
    type: String,
    required: true,
  },

  cm_bio: {
    type: String,
    required: true,
  },

  start_time: {
    type: String,
    requeired: true,
  },
});

export const CompetitionModel = mongoose.model("Competitions", Competition);
