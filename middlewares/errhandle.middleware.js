module.exports = (err, req, res, next) => {
    res.status(err.status ||  500 ).json({
        msg: " we are in err middleware",
        errmsg: err.message
    })
}