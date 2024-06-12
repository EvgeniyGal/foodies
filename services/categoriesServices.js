import Category from '../models/Category.js';

const getCategories = async () => await Category.find();

export default {
  getCategories,
}
