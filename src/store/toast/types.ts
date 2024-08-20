export interface IToastMessage {
  id: string;
  description: string;
  duration: number;
}

export interface IToastState {
  messages: IToastMessage[];
}