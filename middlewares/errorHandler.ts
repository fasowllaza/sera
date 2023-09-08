import { Request, Response, NextFunction } from 'express'; 

const errorHandler = (err:any, req: Request, res:Response, next:NextFunction) => {
    switch (err.name){
        case "Unauthorized":
            res.status(401).json({message:err.message})
            break
        case "Forbidden":
            res.status(403).json({message:err.message})
            break
        case "BadRequest":
            res.status(400).json({message:err.message})
            break
        case "FetchApiFailed":
            res.status(500).json({message: err.message})
            break;
        case "ResourceNotFound":
            res.status(404).json({message: err.message})
            break
        case "ServerError":
            res.status(500).json({message: err.message})
            break
        case "SequelizeValidationError":
            let error:any = []
            err.errors.forEach((el:any)=>{
                error.push(el.message)
            })
            res.status(400).json({error})
            break
        case "SequelizeUniqueConstraintError":
            res.status(400).json({message:"Email must be unique"})
            break
        default:
            console.log(err);
            res.status(500).json({message: "Something went wrong"})
            break 
    }
}

export default errorHandler