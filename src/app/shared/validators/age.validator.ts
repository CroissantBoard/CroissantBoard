import { AbstractControl } from '@angular/forms';

export function ageValidator(control: AbstractControl) {
  const value = control.value.trim();

  if (value === '') {
    return null;
  }

  if (isInt(value)) {
    return parseInt(value) > 0 ? null : { 'invalidAge': true };
  } else {
    return { 'notInteger': true };
  }
}

function isInt(value: any) {
  let x: number;

  if (isNaN(value)) {
    return false;
  }

  x = parseFloat(value);

  return (x | 0) === x;
}
