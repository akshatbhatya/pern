
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import { config } from '../config/Config.js';
export class TokenService{


    signAccessToken(user){
        return jwt.sign(
            {_id:user.id,userRole : user.role},
            config.get("JWT_ACCESS_SECRET"),
            {expiresIn:config.get("JWT_ACCESS_TTL"),issuer: 'pern-api'}
        )
    }

    verifyAccessToken(token){
       return jwt.verify(token,config.get("JWT_ACCESS_SECRET"),{issuer: 'pern-api'})
    }

    generateRefereshToken(){
        const raw = crypto.randomBytes(40).toString('hex');
        const hash = crypto.createHash('sha256').update(raw).digest('hex');
        return { raw, hash };
    }

    hashToken(raw){
        return crypto.createHash("sha256").update(raw).digest('hex');
    }
}