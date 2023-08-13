exports.errorMiddleware = (error, req, res, next) => {
    let customError = {
        statusCode: error.statusCode || 500,
        message: error.message || 'Something went very wrong, maybe try again later?',
    }

    if (error.name === 'ValidationError') {
        customError.validatonErrors = Object.values(error.errors).map((item) => item.message)
        customError.statusCode = 400
    }

    if (error.code && error.code === 11000) {
        customError.message = `Duplicated values entered for ${Object.keys(
            error.keyValue
        )} field, please choose another value`
        customError.statusCode = 400
    }

    if (error.name === 'CastError') {
        customError.message = `No item found with id : ${error.value}`
        customError.statusCode = 404
    }

    return res.status(customError.statusCode).json(customError)
}