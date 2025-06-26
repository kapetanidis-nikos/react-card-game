import connectToDatabase from "../../../lib/mongodb";
import WizardCard from "../../../models/WizardCard"

export async function GET() {
  await connectToDatabase();
  
  try {
    const items = await WizardCard.find({});
    return Response.json({ success: true, data: items });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}