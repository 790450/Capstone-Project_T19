import mongoose from "mongoose";

const alertSettingSchema = new mongoose.Schema(
  {
    userId: { 
      type: String, 
      required: true, 
      unique: true 
    },
    selectedCategories: { 
      type: [String],
       default: [] 
      },
    alertFrequency: { 
      type: String, 
      default: "immediate" 
    }, // options: immediate, hourly, daily
  },
  { timestamps: true }
);

export default mongoose.model("Alertsetting", alertSettingSchema);
