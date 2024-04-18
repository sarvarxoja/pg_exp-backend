import { MongooseError } from "mongoose";
import { CompetitionModel } from "../../Model/competition/competition.model.js";
import { ParticipationModel } from "../../Model/participation_competition/participation.model.js";
import jwt from "jsonwebtoken";

export default {
  async createCompetitions(req, res) {
    try {
      let { cm_sponsors, cm_map, cm_type, cm_name, cm_bio, start_time } =
        req.body;

      let createdData = await CompetitionModel.create({
        cm_banner: req.file.filename,
        cm_sponsors: cm_sponsors,
        cm_map: cm_map,
        cm_type: cm_type,
        cm_name: cm_name,
        cm_bio: cm_bio,
        start_time: start_time,
      });

      res.status(200).json({ createdData });
    } catch (error) {
      console.log(error.message);
    }
  },

  async getCompetitions(req, res) {
    try {
      let competitionData = await CompetitionModel.find();

      if (!competitionData.length) {
        return res.status(200).json({ msg: "На данный момент конкурсов нет" });
      }

      res.status(200).json({ competitionData, status: 200 });
    } catch (error) {
      console.log(error.message);
    }
  },

  async deleteCompetition(req, res) {
    try {
      let { id } = req.params;
      let deleteData = await CompetitionModel.findByIdAndDelete({ _id: id });

      if (deleteData === null) {
        return res.status(404).json({ msg: "This competition not found" });
      }

      res.status(200).json({ msg: "Data succesfully deleted", deleteData });

      console.log(deleteData);
    } catch (error) {
      if (error instanceof MongooseError) {
        return res.status(400).json({ error_message: "invalide id" });
      }
      console.log(error.message);
    }
  },

  async findCmId(req, res) {
    try {
      let { id } = req.params;

      let competition_data = await CompetitionModel.findOne({ _id: id });

      if (!competition_data) {
        return res.status(404).json({ msg: "Data not found" });
      }

      res.status(200).json({ competition_data });
    } catch (error) {
      if (error instanceof MongooseError) {
        return res.status(400).json({ error_message: "invalide id" });
      }
      console.log(error.message);
    }
  },

  async usingCompetition(req, res) {
    try {
      let { competition_id, game_id } = req.body;

      let { access_token } = req.headers;
      const SECRET_KEY = process.env.SECRET_KEY;
      let payload = jwt.verify(access_token, SECRET_KEY);

      await ParticipationModel.create({
        user_id: payload.id,
        competition_id: competition_id,
        game_id: game_id,
      });

      res.status(201).json({
        msg: "You have successfully completed your competition registration",
        status: 201,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  async getGamers(req, res) {
    try {
      let gamersData = await ParticipationModel.find()
        .populate("user_id")
        .populate("competition_id");

      if (!gamersData.length) {
        return res.status(404).json({ msg: "data not found" });
      }

      res.status(200).json({ gamersData, status: 200 });
    } catch (error) {
      console.log(error.message);
    }
  },
};
