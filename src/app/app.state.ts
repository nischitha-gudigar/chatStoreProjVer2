export interface chatActionState {
  chatId: number;
  chatParticular: string[];
}

export interface MyAppState {
  messages: chatActionState[];
}
