import Area from "../models/Area.js";

export const getAreas = () => {
  return Area.find();
};