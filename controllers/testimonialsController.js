import { getTestimonials } from '../services/testimonialsServices.js';

export const getAllTestimonials = async (_, res) => {
  res.json(await getTestimonials());
};
