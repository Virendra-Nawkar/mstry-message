import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation,
})

export async function GET(request: Request) {
    await dbConnect();
    // localhost:3000/api/u/username=virendra?phone=android
    try {
        const { searchParams } = new URL(request.url);
        const queryParam = {
            username: searchParams.get('username')
        }
        // validate wit zod
        const result = UsernameQuerySchema.safeParse(queryParam)
        console.log(result);   //todo remove later
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0
                    ? usernameErrors.join(', ')
                    : "Invalid query parameter",
            }, { status: 400 })
        }

        const { username } = result.data;

        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true })

        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, { status: 400 })
        }

        return Response.json({
            success: true,
            message: "Username is unique"
        }, { status: 400 })

    } catch (error) {
        console.log("Error checking Username : ", error)
        return Response.json({
            success: false,
            message: "Error checking username"
        }, { status: 500 })
    }
}