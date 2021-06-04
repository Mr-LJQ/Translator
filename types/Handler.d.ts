export type MessageHandler = (message:Message,sendResponse:SendResponse) => void
export type Message = {command:string,data:any}
export type SendResponse = (response:any) => void