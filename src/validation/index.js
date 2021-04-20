import Joi from 'joi';
import { errorResponse } from '../utils/response';
import { statusCodes } from '../utils/statuscode';
import { messages } from '../utils/message';




export const tabValidator = {

    /** This functions validates tab input data
        * @param {object} req - The request object
        * @param {object} res - The response oject
        * @param {function} next
        * @returns {object} JSON representing the failure message
        */
    async validateTab(req, res, next) {
      let {
        name, description, dataPoints
      } = req.body;

      const schema = Joi.object().keys({ 
        name: Joi.string().min(3).max(30).required(),
        description: Joi.string().required(),
        dataPoints:  Joi.array().required()
      });

      const dataToValidate = { 
        name, 
        description,
        dataPoints 
      } 

    const validation = schema.validate(dataToValidate);

      if (validation.error) {
          errorResponse(res, statusCodes.badRequest, validation.error.details[0].message);
          return;
      }
      const allowedInputDataType = ['selection', 'text', 'number', 'date'];

      for(let i=0; i<dataPoints.length; i++){
          if(!allowedInputDataType.includes(dataPoints[i].dataType)){
            errorResponse(res, statusCodes.badRequest, messages.allowedInput);
            return
          }
      }

      req.body.name = name
      req.body.description = description;
      req.body.dataPoints = dataPoints;
      return next();
    }
  };