import { Message } from "@/model/User";
export interface ApiResponse {
    succuess : boolean;
    message : string;
    isAcceptingMessage? : boolean
    messages? : Array<Message>
}