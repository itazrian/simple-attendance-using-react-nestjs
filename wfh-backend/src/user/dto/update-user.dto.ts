export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  position?: string;
  phone?: string;
  role?: 'HRD' | 'EMPLOYEE';
}
