import { NextFunction, Request, Response } from 'express';
import * as formidable from 'formidable';
class UploadFiles {
    async upload(req: Request, res: Response, next: NextFunction) {
        try {
            const form = formidable({ multiples: true });
            form.parse(req, async (err: any, fields: any, files: any) => {
                if (err) {
                    next(err);
                }
                else {
                    req.body = { ...fields, ...files };
                    next();
                }
            });
        } catch (e) {
            next(e)
        }

    }

}

export default new UploadFiles().upload;