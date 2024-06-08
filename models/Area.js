import { Schema, model } from 'mongoose';

const area = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export default model('area', area);
