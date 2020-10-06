import { Staff } from '../../models/staff/staff.model';

export class StaffDTO {

  name: string;
  phoneNum: string;
  staffId: number;
  userId: number;
  userLevel: number;
  username: string;
  password: string;
}


function createDTOFromStaffMember(input: Staff): StaffDTO {
  let out: StaffDTO = new StaffDTO();

  out.name = input.name;
  out.phoneNum = input.phoneNumber;
  out.staffId = input.id;
  out.userId = input.user.id;
  out.userLevel = input.user.userLevel;
  out.username = input.user.username;
  out.password = input.user.password;

  return out;
}

function createDTOFromStaff(input: Staff[]): StaffDTO[] {
  let output: StaffDTO[] = [];

  input.forEach((value) => {
    return output.push(createDTOFromStaffMember(value));
  });

  return output;
}

function createStaffMemberFromDTO(input: StaffDTO): Staff {
  let out = new Staff();

    out.name = input.name;
    out.phoneNumber = input.phoneNum;
    out.id = input.staffId;

    out.user.id = input.userId;
    out.user.userLevel = input.userLevel;
    out.user.username = input.username;
    out.user.password = input.password;

    return out;
}

// Convert API output to our Object Oriented model.
function createStaffFromDTO(input: StaffDTO[]): Staff[] {

  let output: Staff[] = [];

  input.forEach((dto) => {

    const staff = createStaffMemberFromDTO(dto);
    output.push(staff);

  });

  return output;
}

export {
  createDTOFromStaff as CreateDTOFromStaff,
  createDTOFromStaffMember as CreateDTOFromStaffMember,
  createStaffFromDTO as CreateStaffFromDTO,
  createStaffMemberFromDTO as CreateStaffMemberFromDTO
};