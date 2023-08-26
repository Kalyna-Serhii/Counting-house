import ButtonEdit from './costs-button-edit';
import api from '../api';

const createCostsForms = async () => {
  const table = document.querySelector('.table');
  const costsListElement = document.querySelector('#costs');
  const template = document.querySelector('#costItemRow');

  if (costsListElement) {
    ButtonEdit();
    const costs = await api.costs.getCostItems();
    const sortCostsByDate = (costItem) => costItem.sort((a, b) => a.date - b.date);

    const createCostItemElement = () => {
      const sortedCosts = sortCostsByDate(costs);
      for (const costItem of sortedCosts) {
        if ('content' in document.createElement('template')) {
          const clone = template.content.cloneNode(true);
          const forms = clone.querySelectorAll('.form-cost-item');
          for (const form of forms) {
            form.id = costItem.id;
            for (const input of form) {
              if (input.type !== 'file' && input.type !== 'button' && input.type !== 'select-one') {
                input.readOnly = true;
              } else if (input.type === 'select-one') {
                input.disabled = true;
              }
              input.value = costItem[input.name];
            }
          }
          table.appendChild(clone);
        }
      }
    };
    createCostItemElement();
  }
};

export default createCostsForms;
