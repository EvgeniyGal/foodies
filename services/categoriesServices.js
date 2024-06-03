import Category from "../models/Category.js";

export const getCategories = () => {
  return Category.find();
};

export const addCategory = (category) => {
  return Category.create(category);
};

export const deleteCategories = () => {
  return Category.deleteMany();
};
