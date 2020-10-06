import { UserLevel, User } from "../../models/user/user.model";
import { Staff } from '../../models/staff/staff.model';

export class UserDTO {
    userId: number;
    username: string;
    password: string;
    phoneNum: string;
    name: string;
    userLevel: UserLevel;
}

function createUserFromDTO(input: UserDTO): User {
    let out: User = new User();

    out.id = input.userId;
    out.password = input.password;
    out.userLevel = input.userLevel;
    out.username = input.username;
    
    return out;
}

function createUsersFromDTO(input: UserDTO[]): User[] {
    let output: User[] = [];

    input.forEach((value) => {
        return output.push(this.createUserFromDTO(value));
    });

    return output;
}

function createDTOFromUser(input: User): UserDTO {
    let out: UserDTO = new UserDTO();

    out.userId = input.id;
    out.username = input.username;
    out.password = input.password;
    out.userLevel = input.userLevel;
    // TODO: --- 
    //out.phoneNum = input.?? <--- Den er ikke på user men Staff.
    //out.name = input.?? <--- Den er ikke på user men Staff.

    return out;
}

function createDTOFromUsers(input: User[]): UserDTO[] {
    let output: UserDTO[] = [];

    input.forEach((value) => {
        return output.push(createDTOFromUser(value));
    });

    return output;
}

export { 
    createUserFromDTO as CreateUserFromDTO,
    createUsersFromDTO as CreateUsersFromDTO,
    createDTOFromUser as CreateDTOFromUser,
    createDTOFromUsers as CreateDTOFromUsers
};