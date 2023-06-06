import { Response } from 'express';
/**
 * 
 * @param res 
 * @param status 
 * @param message 
 * @param data 
 */
export const sendResponse = (
    res: Response,
    status: number,
    message: string,
    data: any = {}) => {
    res.status(status).json({
        status,
        message,
        data
    })
}