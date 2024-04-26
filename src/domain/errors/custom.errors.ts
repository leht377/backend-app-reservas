export class CustomErrors extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message)
  }

  static badRequest(message: string) {
    return new CustomErrors(400, message)
  }

  static unautorized(message: string) {
    return new CustomErrors(401, message)
  }

  static forbidden(message: string) {
    return new CustomErrors(403, message)
  }

  static internalServer(message: string = 'Internal server Error') {
    return new CustomErrors(500, message)
  }
}
