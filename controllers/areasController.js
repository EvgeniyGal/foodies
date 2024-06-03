import { getAreas } from "../services/areasServices.js";

export const getAllAreas = async (_, res) => {
  res.json(await getAreas());
};