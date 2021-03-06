let jwt = require('jsonwebtoken');
const { UserService } = require('./services/user-service');
const userService = new UserService();
const { LoggerService } = require('./services/logger-service');
const loggerService = new LoggerService();

const access = {
    READ: ['CTO', 'Techlead'],
    CREATE: ['CTO', 'Techlead'],
    UPDATE: ['CTO', 'Techlead'],
    DELETE: ['CTO'],
    PUBLISH: ['CTO'],
    MANAGE: ['CTO']
}

let checkToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(403);
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(403);
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

let canRead = async (req, res, next) => {
    if(await isAuthorized(req, access.READ)) {
        next();
    } else {
        res.status(403);
        return res.json({
            success: false,
            message: 'Access Denied'
        });
    }
};

let canCreate = async (req, res, next) => {
    if(await isAuthorized(req, access.CREATE)) {
        next();
    } else {
        res.status(403);
        return res.json({
            success: false,
            message: 'Access Denied'
        });
    }
};

let canUpdate = async (req, res, next) => {
    if(await isAuthorized(req, access.UPDATE)) {
        next();
    } else {
        res.status(403);
        return res.json({
            success: false,
            message: 'Access Denied'
        });
    }
};

let canDelete = async (req, res, next) => {
    if(await isAuthorized(req, access.DELETE)) {
        next();
    } else {
        res.status(403);
        return res.json({
            success: false,
            message: 'Access Denied'
        });
    }
};

let canPublish = async (req, res, next) => {
    if(await isAuthorized(req, access.PUBLISH)) {
        next();
    } else {
        res.status(403);
        return res.json({
            success: false,
            message: 'Access Denied'
        });
    }
};

let canManage = async (req, res, next) => {
    if(await isAuthorized(req, access.MANAGE)) {
        next();
    } else {
        res.status(403);
        return res.json({
            success: false,
            message: 'Access Denied'
        });
    }
};

async function isAuthorized(req, access) {
    let token = req.headers['authorization'];
    let user = await userService.getUserFromToken(token);
    return (access.includes(user.role));
}

let logger = async (req, res, next) => {
    let token = req.headers['authorization'];
    let email = '';
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        email = jwt.decode(token).email;
    }
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    loggerService.logAdministrationAccess(new Date(), email, fullUrl, req.method, req.body);
    next();
}

module.exports = {
    checkToken: checkToken,
    canRead: canRead,
    canCreate: canCreate,
    canUpdate: canUpdate,
    canDelete: canDelete,
    canPublish: canPublish,
    canManage: canManage,
    logger: logger
};