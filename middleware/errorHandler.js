function errorHandler(err, req, res, next) {
    console.log(err);

    res.status(500).json({
        message: "There is some error from server side"
    })
}

export default errorHandler;