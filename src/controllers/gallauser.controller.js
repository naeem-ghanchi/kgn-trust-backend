import * as Yup from "yup";
import GallaUser from "../models/GallaUser";
import {
  BadRequestError,
  ValidationError,
} from "../utils/ApiError";
const { Op } = require('sequelize');


//Yup is a JavaScript schema builder for value parsing and validation.
let gallaUserController = {
  add: async (req, res, next) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        address: Yup.string().required(),
        city: Yup.string().required(),
        pincode: Yup.string().required(),
        mobile: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      const { mobile } = req.body;

      const userExists = await GallaUser.findOne({
        where: { mobile },
      });

      if (userExists) throw new BadRequestError('Mobile Number already exists.');
      const user = await GallaUser.create({...req.body, createdBy: req.userId});

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      // Get query parameters
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || '';
      const sortBy = req.query.sortBy || 'createdAt';
      const sortOrder = req.query.sortOrder === 'asc' ? 'ASC' : 'DESC';

      const offset = (page - 1) * limit;
      
      // Search condition
      const whereCondition = {
        [Op.or]: [
          { id: { [Op.iLike]: `%${search}%` } },
          { name: { [Op.iLike]: `%${search}%` } },
          { mobile: { [Op.iLike]: `%${search}%` } }
        ]
      };

      const { rows, count } = await GallaUser.findAndCountAll({
        where: search ? whereCondition : {},
        order: [[sortBy, sortOrder]],
        limit,
        offset
      });

      return res.status(200).json({
        data: rows,
        pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
      }
      });
    } catch (error) {
      next(error);
    }
  },

};

export default gallaUserController;
