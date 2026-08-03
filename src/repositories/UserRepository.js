import { BaseRepository } from "./BaseRepository.js";
class UserRepository extends BaseRepository{

    constructor(){
        super("users");
    }
    
    findByemail(email){
        return this.findByColumn('email',email);
    }

}

export const UserRepository = new UserRepository();