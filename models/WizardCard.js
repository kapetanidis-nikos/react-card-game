import mongoose from "mongoose";

const WizardCardSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
    enum: ["red", "blue", "green", "yellow", "black"],
  },
});

// Export the model, making sure it's only compiled once
export default mongoose.models.WizardCard || mongoose.model("WizardCard", WizardCardSchema);
