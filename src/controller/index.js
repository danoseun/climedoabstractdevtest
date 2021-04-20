import { Tab } from '../models/tab';
import BaseService from '../services'
import { successResponse, successResponseWithData, errorResponse } from '../utils/response';
import { statusCodes } from '../utils/statuscode';
import { messages } from '../utils/message';



const TabService = new BaseService(Tab);

export const tabController = {
    /**
     * Create tab on the application
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof tabController object
     */
    async addTab(req, res){
        try {
            const newTab = await TabService.create(req.body);
            successResponseWithData(res, statusCodes.created, messages.created, newTab);
            return;
          } catch (error) {
            errorResponse(res, statusCodes.serverError, error.message);
            return;
          }
    },
    
    /**
     * Updates tab on the application
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof tabController object
     */
    async updateTab(req, res){
        try{
            const updatedTab = await TabService.update({_id: req.params.tabId}, req.body);
           return successResponseWithData(res, statusCodes.success, messages.success, updatedTab);
    
      } catch(error){
        errorResponse(res, statusCodes.serverError, error.message);
        return;
      }
    },

    /**
     * Get all tabs on the application
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof tabController object
     */
    async getAllTabs(req, res){
        let { page, perPage } = req.query;
        perPage = perPage ? Number(perPage, 10) : 10;
        page = page ? Number(page, 10) : 1;

        try {
          let result = await TabService.index({}, page, perPage)
          result.length > 0 ? successResponseWithData(res, statusCodes.success, messages.ok, result) : successResponse(res, statusCodes.notFound, messages.notFound);
          return;
        }
         catch(error){
          errorResponse(res, statusCodes.serverError, error.message);
          return;
        }   
    },

    /**
     * Remove specific tab on the application
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof tabController object
     */
    async removeTab(req, res){
        try{
            await TabService.remove({_id: req.params.tabId});
           return successResponse(res, statusCodes.deleted, messages.deleted);
        } catch(error){
            errorResponse(res, statusCodes.serverError, error.message);
            return;
        }
    }

}