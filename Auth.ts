import { Request } from "express";

const authenticate = (req: Request): boolean => {
    if (req && req.headers && req.headers.authorization) {
        let auth = Buffer.from(
            req.headers.authorization.split(" ")[1],
            "base64"
        ).toString();

        //auth = username:password
        
        console.log(auth);
    }
    return true;
};

export { authenticate };
