import { ConflictException } from '@nestjs/common';

export class UserRequireUniqueEmailException extends ConflictException {
  constructor() {
    super('Email must be unique');
  }
}
