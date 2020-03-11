import Sortable from 'sortablejs';

const initSortable = () => {
  const list = document.querySelector('#favorite-container');
  Sortable.create(list);
};

export { initSortable };
