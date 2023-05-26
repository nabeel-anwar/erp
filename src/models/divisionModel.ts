import { model, Schema } from "mongoose";
import { Division } from "src/types/division";

const divisionSchema: Schema = new Schema({
  name: {
    type: String,
    require: [true, "A tour must have a name"],
    unique: true,
    trim: true,
    maxLength: [40, "A maximum character size is 40"],
    minLength: [10, "A minimum character size is 10"],
  },
  division: {
    type: Schema.Types.ObjectId,
    ref: "Division",
  },
  currency: {
    types: Schema.Types.ObjectId,
    ref: "Currency",
  },
});

const Division = model<Division>("Division", divisionSchema);

export default Division;
