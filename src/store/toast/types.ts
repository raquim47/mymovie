export interface IToastMessage {
  id: string;
  description: string;
  duration: number;
  createdAt: number;
}

export interface IToastState {
  messages: IToastMessage[];
}