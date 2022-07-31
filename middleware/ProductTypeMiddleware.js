const ProductTypeMiddleware = (request,response,next) => {
    console.log(`Method: ${request.method} - URL: ${request.url} - Time: ${new Date()}`);

    next();
}

module.exports = {ProductTypeMiddleware};