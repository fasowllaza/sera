import { NextFunction } from "express"

const {verify} = require('../helpers/jwt')

const authentication = (req: any, res: Response, next: NextFunction) => {
    if(!req.headers.access_token){
        next({name: "Unauthorized", message: "Login First"})
    }
    else{
        const decoded = verify(req.headers.access_token)
        req.user = {
            id: decoded.id,
            username: decoded.username
        }
        next()
    }
}

export default authentication