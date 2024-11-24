import { connectDatabase } from "@/dbConnection/dbConnection";
import Admin from '@/models/admin.models'
import { NextRequest, NextResponse } from 'next/server'

connectDatabase();

export async function GET() {
    try {
      // Fetch the admin document from the database
      const adminData = await Admin.findOne({}); // Fetch the first admin document
      if (!adminData) {
        return NextResponse.json({ message: "Admin document not found" }, { status: 404 });
      }
  
      // Return the admin data
      return NextResponse.json({
        message: "Admin data fetched successfully",
        data: {
          canGiveFeedback: adminData.canGiveFeedback,
          descriptionCharLimit: adminData.descriptionCharLimit,
        },
      });
    } catch (error) {
      console.error("Error fetching admin data:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest){

    try {
        // Parse the request body
        const { canGiveFeedback, descriptionCharLimit } = await req.json();
    
        console.log("Incoming value for canGiveFeedback: ", canGiveFeedback);

        // Validate input and prepare the update object
        const updateData: Partial<{ canGiveFeedback: boolean; descriptionCharLimit: number }> = {};
    
        if (typeof canGiveFeedback !== 'undefined') {
          if (typeof canGiveFeedback !== 'boolean') {
            return NextResponse.json({ message: "Invalid value for canGiveFeedback" }, { status: 400 });
          }
          updateData.canGiveFeedback = canGiveFeedback;
        }
    
        if (typeof descriptionCharLimit !== 'undefined') {
          if (typeof descriptionCharLimit !== 'number') {
            return NextResponse.json({ message: "Invalid value for descriptionCharLimit" }, { status: 400 });
          }
          updateData.descriptionCharLimit = descriptionCharLimit;
        }
    
        // Ensure at least one field is provided
        if (Object.keys(updateData).length === 0) {
          return NextResponse.json({ message: "No valid fields provided for update" }, { status: 400 });
        }
    
        // Hardcoded `_id` of the admin document
        const adminId = '674359ab483aeb438e79406c';
    
        // Update the document in the admin collection
        const updatedAdmin = await Admin.findByIdAndUpdate(
          adminId,
          { $set: updateData },
          { new: true } // Return the updated document
        );

        console.log("Data in updatedAdmin: ", updatedAdmin);
    
        if (!updatedAdmin) {
          return NextResponse.json({ message: "Admin document not found" }, { status: 404 });
        }
    
        // Return the updated document
        return NextResponse.json({ message: "State updated successfully", data: updatedAdmin });
      } catch (error) {
        console.error("Error updating admin state:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
      }  

}