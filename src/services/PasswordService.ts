import { IPasswordService } from "../Interfaces";

// Password service for validating passwords
export class PasswordService implements IPasswordService {
    isValidPasswordFormat(password : string) : boolean
    {        
        return password.length > 0 &&
            password.length < 50;
    }
}