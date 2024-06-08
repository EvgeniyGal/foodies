import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const category = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for category"],
    },
  },
  {
    versionKey: false,
  }
);

category.post("save", handleSaveError);
category.pre("findOneAndUpdate", setUpdateSettings);
category.post("findOneAndUpdate", handleSaveError);

export default model("Category", category);
