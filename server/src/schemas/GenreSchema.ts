import { Schema, model } from "mongoose";

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});

export const GenreModel = model("Genre", GenreSchema);
