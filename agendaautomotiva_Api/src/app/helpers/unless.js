const unless = (routes = [], middleware) => {
    return (req, res, next) => {
        if (routes.includes(req.originalUrl)) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
};

module.exports = unless;