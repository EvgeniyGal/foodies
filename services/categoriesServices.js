import Category from "../models/Category.js";

export const getCategories = () => {
  return Category.find();
};
