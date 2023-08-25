import costService from '../service/cost-service';
import CostSchemeValidation from '../validations/schemes/cost-scheme';
import validation from '../validations/validation';

// ошибка будет обработана в Error-middleware
/* eslint-disable consistent-return */

const CostController = {
  async getCostItems(req, res, next) {
    try {
      const costItems = await costService.getCostItems();
      return res.status(200).json(costItems);
    } catch (error) {
      next(error);
    }

    // #swagger.tags = ['Costs']
    // #swagger.summary = 'Get a list of costs'
    // #swagger.description = 'Returns a list of all costs'
    /* #swagger.responses[200] = {
        schema: {
            type: 'array'
        },
        examples: {
            'application/json': [
                {
                  id: 1,
                  title: "first title",
                  comment: "first comment",
                  date: "2023-09-24",
                  sum: 2500,
                  category: "Еда"
              },
              {
                  id: 3,
                  title: "Ремонт насоса",
                  comment: null,
                  date: "2023-03-21",
                  sum: 1593,
                  category: "Ремонт"
              }
            ]
        }
        } */
    // #swagger.responses[500]
  },

  async createCostItem(req, res, next) {
    try {
      validation(req.body, CostSchemeValidation, next);
      const newCostItem = await costService.createCostItem(req.body);
      return res.status(201).json(newCostItem);
    } catch (error) {
      next(error);
    }

    // #swagger.tags = ['Costs']
    // #swagger.summary = 'Create a new cost item'
    // #swagger.description = 'New cost item with the provided information'
    /*  #swagger.parameters['obj'] = {
               in: 'body',
               description: 'CostModel object',
               schema: {
                    $title: "Ремонт насоса",
                    comment: "Ремонт насоса, який зламався",
                    $date: "2023-03-21",
                    $sum: 1593,
                    $category: "Ремонт"
                }
        } */
    /* #swagger.responses[201] = {
            schema: {
                id: 4,
                title: "Ремонт насоса",
                comment: "Ремонт насоса, який зламався",
                date: "2023-03-21",
                sum: 1593,
                category: "Ремонт"
                }
        }
    } */
    // #swagger.responses[400]
    // #swagger.responses[500]
  },

  async updateCostItem(req, res, next) {
    try {
      validation(req.body, CostSchemeValidation, next);
      const updatedCostItem = await costService.updateCostItem(req.params, req.body);
      return res.status(200).json(updatedCostItem);
    } catch (error) {
      next(error);
    }

    // #swagger.tags = ['Costs']
    // #swagger.summary = 'Update a fake user'
    // #swagger.description = 'Updates a fake user by user id with the provided information'
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'CostModel object',
                schema: {
                    $title: "Ремонт насоса",
                    comment: "Ремонт насоса, який зламався",
                    $date: "2023-03-21",
                    $sum: 1593,
                    $category: "Ремонт"
                }
        } */
    /* #swagger.responses[200] = {
            schema: {
                id: 4,
                title: "Ремонт насосів",
                comment: "Ремонт насосів, які зламались",
                date: "2022-11-15",
                sum: 2740,
                category: "Ремонт"
                }
          } */
    // #swagger.responses[400]
    // #swagger.responses[500]
  },

  async deleteCostItem(req, res, next) {
    try {
      await costService.deleteCostItem(req.params);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }

    // #swagger.tags = ['Costs']
    // #swagger.summary = 'Delete a cost item'
    // #swagger.description = 'Deletes a cost item by cost id'
    // #swagger.parameters['id'] = { description: 'CostModel id' }
    // #swagger.responses[400]
    // #swagger.responses[500]
  },
};

export default CostController;
