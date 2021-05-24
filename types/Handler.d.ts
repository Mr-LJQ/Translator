export type Handler = (message:Message,sendResponse:SendResponse) => void
type Message = {command:string,data:any}
export type SendResponse = (response:any) => void