export interface chatActionState {
  chatId: number;
  message: string[];
}

export interface MyAppState {
  messages: chatActionState[];
}
