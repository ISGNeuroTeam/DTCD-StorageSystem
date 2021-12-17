import { BaseError } from './_BaseError';

export class AbstractClassInstanceError extends BaseError {
  constructor (className) {
    super(`Abstract class ${className} cannot have instances`);
  }
}

export class MethodImplementError extends BaseError {
  constructor (methodName, className) {
    super(
      `The "${methodName}" method must be implemented in the ${className} class`
    );
  }
}
