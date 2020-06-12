import { AbstractControl } from '@angular/forms';

export function ageValidator(control: AbstractControl) {
  let value = control.value.trim();

  if (value === '') {
    return null;
  }

  if (!isInt(value)) {
    return { 'notInteger': true };
  } else {
    value = parseInt(value, 10);

    if (value < 1) {
      return { 'invalidAge': true };
    } else if (value < 13) {
      return { 'tooYoung': true };
    } else if (value > 117) {
      return { 'tooOld': true };
    } else {
      return null;
    }
  }
}

function isInt(value: any) {
  if (isNaN(value)) {
    return false;
  }

  return Number.isInteger(parseInt(value, 10));
}
