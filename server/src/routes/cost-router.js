import express from 'express';
import costController from '../controllers/cost-controller';

const router = express.Router();

router.get('/costs', costController.getCostItems);
router.post('/cost', costController.createCostItem);
router.patch('/cost/:id', costController.updateCostItem);
router.delete('/cost/:id', costController.deleteCostItem);

export default router;
