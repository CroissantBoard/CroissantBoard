import { AbstractControl } from '@angular/forms';

export function fullNameValidator(control: AbstractControl) {
  return control.value.trim().split(' ').length < 2
    ? { 'invalidName': true }
    : null;
}
