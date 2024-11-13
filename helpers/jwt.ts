import jwt from "jsonwebtoken";

export const GenerateJWT = (id: number, user: string) => {

    return new Promise((resolve, reject) => {

        const payload = { id, user };
        jwt.sign(payload, process.env.SECRET_JWT_SEED ?? "", {

        }, (err, token) => {
            if (err){
                console.log(err);
                reject("The token generation failed")
            }

            resolve(token);
        });
    })
}