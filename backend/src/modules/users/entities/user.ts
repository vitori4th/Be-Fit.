import { UserRoleType } from '@prisma/client';
import { randomUUID } from 'crypto';

export interface IUserDTO {
  email: string;

  cpf: number;

  role?: UserRoleType;

  name: string;

  lastName: string;

  dateBirth: Date;

  password: string;

  cellphone: number;

  createdAt: Date;

  updatedAt: Date;
}

class User {
  id?: string;

  email: string;

  cpf: number;

  role?: UserRoleType;

  name: string;

  lastName: string;

  dateBirth: Date;

  password: string;

  cellphone: number;

  createdAt: Date;

  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}

export { User };
