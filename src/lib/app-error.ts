export class AppError extends Error {
  code: string | number;

  constructor(message: string, code: string | number) {
    super(message);
    this.code = code;
    this.name = "AppError";
  }
}
