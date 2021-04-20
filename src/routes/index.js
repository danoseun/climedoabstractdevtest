import express from 'express';
import { tabController } from '../controller';
import { tabValidator } from '../validation';



const { addTab, updateTab, getAllTabs, removeTab } = tabController;

const { validateTab } = tabValidator;

export const router = express.Router();

router.post('/api/v1/tabs', validateTab, addTab);
router.put('/api/v1/tabs/:tabId', updateTab);
router.get('/api/v1/tabs', getAllTabs);
router.delete('/api/v1/tabs/:tabId', removeTab);
