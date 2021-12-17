import { BaseError } from './_BaseError';

export class RecordKeyError extends BaseError {
  constructor (msg) {
    super(`Record key error: ${msg}`);
  }
}

export class RecordValueError extends BaseError {
  constructor (msg) {
    super(`Record value error: ${msg}`);
  }
}

export class RecordDuplicateError extends BaseError {
  constructor (key) {
    super(`Record with key "${key}" already exists`);
  }
}
