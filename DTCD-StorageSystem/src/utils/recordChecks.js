import { RecordKeyError, RecordValueError } from './errors/recordErrors';

export function checkKey (key) {
  if (typeof key !== 'string') {
    throw new RecordKeyError('Key must be a string');
  } else if (key === '') {
    throw new RecordKeyError('Key cannot be empty');
  } else if (key.startsWith(' ')) {
    throw new RecordKeyError('Key cannot start with a space');
  } else return key.trim();
}

export function checkValue (value) {
  if (value === undefined) {
    throw new RecordValueError('Value must be defined');
  } else if (typeof value === 'function') {
    throw new RecordValueError('Value cannot be a function');
  } else return value;
}
