import { connectionStr } from "@/app/lib/db";
import { User } from "@/app/lib/model/users";
import { userList } from "@/app/utils/userData";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// export async function GET(request) {
//  return NextResponse.json(userList, { status: 200 });
// }
export async function GET(request) {
  try {
    await mongoose.connect(connectionStr);
    const data = await User.find().lean();
    return NextResponse.json({ result: data,message:"Users retrieved successfully" }, { status: 200 });
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to connect to database" },
      { status: 500 }
    );
  }
}
export async function POST(request) {
    const payload = await request.json();
     await mongoose.connect(connectionStr);
     const newUser = new User(payload);
     const result = await newUser.save();
    if(payload.name && payload.email && payload.designation){
     return NextResponse.json({result, message:"New User Created Successfully",success:true}, { status: 201 });  
    } else {
        return NextResponse.json({result:"Invalid user data",success:false}, { status: 500 });
    }
 
}