export interface Handler {
  distributeTasks:(message:Message,sendResponse:sendResponse) => void
}

export interface Message {
  command: string
  data: any
}

export type sendResponse = (response?:any) => void