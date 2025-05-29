import * as Yup from "yup";
import GallaAmount from "../models/GallaAmount";
import {
  BadRequestError,
  ValidationError,
} from "../utils/ApiError";
const { Op } = require('sequelize');


//Yup is a JavaScript schema builder for value parsing and validation.
let gallaAmountController = {
  add: async (req, res, next) => {
    try {
      const schema = Yup.object().shape({
        amount: Yup.string().required(),
        gallaUserId: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      console.log('req.body::', req.body);
      
      const user = await GallaAmount.create({...req.body, createdBy: req.userId});

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
      const userId = req.query.userId || '0';
      const sortBy = req.query.sortBy || 'galladate';
      const sortOrder = req.query.sortOrder === 'asc' ? 'ASC' : 'DESC';

      const offset = (page - 1) * limit;
      
      const whereClause = {};
      if (userId) {
        whereClause.gallaUserId = userId;
      }

      if (search) {
        whereClause.amount = {
          [Op.iLike]: `%${search}%`
        };
      }


      const { rows, count } = await GallaAmount.findAndCountAll({
        where: whereClause,
        order: [[sortBy, sortOrder]],
        limit,
        offset
      });

      // Fetch total amount (regardless of pagination)
      const totalAmount = await GallaAmount.sum('amount', { where: whereClause });


      return res.status(200).json({
        data: rows,
        pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
        totalAmount: totalAmount || 0
      }
      });
    } catch (error) {
      next(error);
    }
  },

};

export default gallaAmountController;
