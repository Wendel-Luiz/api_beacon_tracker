import { Role } from '../enums/roles.enum';

export function roleCanDelete(role1: Role, role2: Role): boolean {
  switch (role1) {
    case Role.SuperAdmin:
      return true;
    case Role.Admin:
      return role2 !== Role.SuperAdmin;
    case Role.Customer:
      return role2 === Role.Customer;
    case Role.Device:
      return role2 === Role.Device;
  }
}
