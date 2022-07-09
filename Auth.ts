import { Request } from "express";

//dotenv

const apiAuthenticate = (req: Request): boolean => {
    if (req && req.headers && req.headers.authorization) {
        let auth = Buffer.from(
            req.headers.authorization.split(" ")[1],
            "base64"
        ).toString();

        //auth = username:password
        let key = auth.split(":")[0];
        let pass = auth.split(":")[1];

        if (
            key === process.env.API_AUTH_KEY &&
            pass === process.env.API_AUTH_PASS
        ) {
            return true;
        }
    }
    return false;
};

export { apiAuthenticate };
