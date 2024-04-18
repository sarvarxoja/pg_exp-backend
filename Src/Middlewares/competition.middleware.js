import { MongooseError } from "mongoose";
import { CompetitionModel } from "../Model/competition/competition.model.js";
import { ParticipationModel } from "../Model/participation_competition/participation.model.js";
import jwt from "jsonwebtoken";

export default {
  async checkCompetitionValue(req, res, next) {
    try {
      let { cm_sponsors, cm_map, cm_type, cm_name, cm_bio, start_time } =
        req.body;

      if (
        !req.file ||
        !cm_map ||
        !cm_type ||
        !cm_name ||
        !cm_bio ||
        !start_time
      ) {
        return res
          .status(400)
          .json({ msg: "ma'lumotlar toliq kiritilmagan", staus: 400 });
      }

      if (
        !isNaN(cm_map) ||
        !isNaN(cm_type) ||
        !isNaN(cm_name) ||
        !isNaN(cm_bio) ||
        !isNaN(start_time)
      ) {
        return res.status(400).json({
          msg: "Invalide values. All values must be string",
          status: 400,
        });
      }

      return next();
    } catch (error) {
      console.log(error.message);
    }
  },

  async participationMiddleware(req, res, next) {
    try {
      let { competition_id, game_id } = req.body;

      let { access_token } = req.headers;
      const SECRET_KEY = process.env.SECRET_KEY;
      let payload = jwt.verify(access_token, SECRET_KEY);

      if (!competition_id || !game_id) {
        return res
          .status(400)
          .json({ msg: "ma'lumotlar toliq kiritilmagan", staus: 400 });
      }

      let checkCompetition = await CompetitionModel.findOne({
        _id: competition_id,
      });

      if (!checkCompetition) {
        return res
          .status(404)
          .json({ msg: "this competition not found", status: 404 });
      }

      let productData = await ParticipationModel.findOne({
        user_id: payload.id,
        competition_id: competition_id,
      });

      if (productData) {
        return res.status(400).json({
          msg: "siz oldin bu musobaqa uchun royhatdan otgansiz",
          staus: 400,
        });
      }

      if (isNaN(game_id)) {
        return res
          .status(400)
          .json({ msg: "game_id must be number", status: 400 });
      }

      return next();
    } catch (error) {
      console.log(error.message);
      if (error instanceof MongooseError) {
        return res.status(400).json({ error_message: "invalide id" });
      }
    }
  },
};
