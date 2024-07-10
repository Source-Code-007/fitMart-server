import { Response } from "express"

const sendResponse = (res:Response, statusCode:number, format:{success:boolean, message:string, data:any})=> {
    res.status(statusCode).send({success:format?.success, message:format?.message, data:format?.data || null})
}

export default sendResponse