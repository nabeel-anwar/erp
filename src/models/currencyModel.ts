import { model, Schema } from "mongoose";
import { Currency } from "src/types/division";

const currencySchema: Schema = new Schema({
  name: {
    type: String,
    require: [true, "currency must have a name"],
    unique: true,
    trim: true,
    maxLength: [40, "maximum character size is 40"],
  },
  symbol: {
    type: String,
    require: [true, "currency must have a symbol"],
    trim: true,
    maxLength: [16, "maximum character size is 40"],
  },
  iso: {
    type: String,
    require: [true, "currency must have a iso"],
    trim: true,
    maxLength: [16, "maximum character size is 40"],
  },
});

currencySchema.index({ "$**": "text" });

const Currency = model<Currency>("Currency", currencySchema);

export default Currency;
