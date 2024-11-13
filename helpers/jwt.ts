
import jwt from 'jsonwebtoken';

export const GenerateJWT = (id: string, user: string, ip: string) => {
    return new Promise((resolve, reject) => {

        const payload = { id, user, ip };
        jwt.sign(payload, process.env.SECRET_JWT_SEED ?? "", {
            
        }, (err, token) => {
            if (err){
                console.log(err);
                reject("Token generation failed");
            }

            resolve(token);
        });
    })
}