import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User"

export async function POST(request: Request) {
    await dbConnect();

    const { username, content } = await request.json();
    try {
        const user = UserModel.findOne({ username })
        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        // is user acceping the message
        if (!user.isAcceptingMessage) {
            return Response.json({
                success: false,
                message: "User is not Accepting Messages"
            }, { status: 403 })
        }

        // new message
        const newMessage = { content, createdAt: new Date() }
        user.messages.push(newMessage as Message)
        await user.save();

        return Response.json({
            success: true,
            message: "Message sent succussfully"
        }, { status: 404 })
    } catch (error) {
        console.log("Error adding messages : ", error)
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}