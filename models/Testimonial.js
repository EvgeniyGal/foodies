import { Schema, model } from "mongoose";


const testimonial = new Schema(
  {
    testimonial: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);



export default model("testimonial", testimonial);