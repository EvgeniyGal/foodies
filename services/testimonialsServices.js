import Testimonial from "../models/Testimonial.js";

export const getTestimonials = () => {
  return Testimonial.find();
};

