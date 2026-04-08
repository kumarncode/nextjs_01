import { connectionStr } from "@/app/lib/db";
import { User } from "@/app/lib/model/users";
import { userList } from "@/app/utils/userData";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = await params;
    await mongoose.connect(connectionStr);
        const data = await User.find().lean();
    const userData = data.find(userData => userData._id == id);
    if (!userData) {
        return NextResponse.json({ error: "UserData not found" }, { status: 404 });
    }
    return NextResponse.json(userData, { status: 200 });
}
export async function PUT(request, { params }) {
    const { id } = await params;
     await mongoose.connect(connectionStr);
    let payload = await request.json();
    payload._id = id;
    console.log("Received payload for update:", payload);
     const updatedUser = await User.findByIdAndUpdate(id, payload, { new: true });
    if (!updatedUser) {
        return NextResponse.json({ error: "User not found for update" }, { status: 404 });
    }
    return NextResponse.json({result:updatedUser,success:true}, { status: 200 });
}
export async function DELETE(request, { params }) {
    const { id } = await params;
    await mongoose.connect(connectionStr);
    const deletedUser = await User.findByIdAndDelete(id);
    if(deletedUser){
        return NextResponse.json({result:"User deleted successfully",success:true}, { status: 200 });
    } else {
        return NextResponse.json({result:"User not found for deletion",success:false}, { status: 404 });
    }
}