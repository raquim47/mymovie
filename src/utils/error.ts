export interface IError {
  message: string;
  code?: number;
}

export const createError = (message: string, code?: number): IError => {
  return { message, code };
};
