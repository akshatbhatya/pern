import { TokenService } from "./TokenService.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { ConflictError } from "../errors/AppError";
import bcrypt from "bcrypt";

class AuthService{

    constructor(token = new TokenService() , users = new UserRepository()){
        this.token =token;
        this.users=users;
    }

    async register({firstName,Lastname, email,password}){
        const checkExisting = await this.users.findByemail(email);
        if(checkExisting) throw new ConflictError("user is alredy exists");

        const hashedPassword =  bcrypt.hashSync(password,10);

        this.users.create({
            first_name: firstName,
            last_name: lastName,
            email,
            password_hash: hashedPassword,
            role: 'member',
        })

    }
}