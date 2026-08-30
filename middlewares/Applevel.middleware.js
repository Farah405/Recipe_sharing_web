module.exports =(req , res , next) =>
{
    console.log(`${req.url} and method ${req.method}`);
    next()
}