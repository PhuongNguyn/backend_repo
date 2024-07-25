export class APISucess<T> {
  private readonly message: string;
  private readonly data: T;

  constructor(data: T, message = "Success") {
    (this.message = message), (this.data = data);
  }

  formatResponse() {
    return {
      message: this.message,
      data: this.data,
    };
  }
}
