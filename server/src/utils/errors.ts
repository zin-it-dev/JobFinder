class BaseError extends Error {
    statusCode: number
    errorCode: string

    constructor(statusCode: number, message: string, errorCode: string) {
        super(message)
        this.statusCode = statusCode
        this.errorCode = errorCode
        this.name = this.constructor.name
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

class BadRequestError extends BaseError {
    constructor(message: string = 'Bad Request') {
        super(400, message, 'BAD_REQUEST')
    }
}

class NotFoundError extends BaseError {
    constructor(message: string = 'Resource Not Found') {
        super(404, message, 'RESOURCE_NOT_FOUND')
    }
}

export { BadRequestError, NotFoundError }
