import { model, Schema } from "mongoose";
import { Division } from "src/types/division";

const divisionSchema: Schema = new Schema({
  name: {
    type: String,
    require: [true, "division must have a name"],
    unique: true,
    trim: true,
    maxLength: [40, "maximum character size is 40"],
    minLength: [5, "minimum character size is 10"],
  },
  division: {
    type: Schema.Types.ObjectId,
    ref: "Division",
  },
});

divisionSchema.index({ "$**": "text" });

const Division = model<Division>("Division", divisionSchema);

export default Division;
