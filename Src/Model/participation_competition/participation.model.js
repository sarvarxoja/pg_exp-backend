import mongoose from "mongoose";
import { Schema } from "mongoose";

const Participation = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },

  competition_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Competitions",
    required: true,
  },

  game_id: {
    type: Number,
    required: false,
  },

  created: {
    type: Date,
    default: Date,
  },
});

export const ParticipationModel = mongoose.model(
  "Participation",
  Participation
);
