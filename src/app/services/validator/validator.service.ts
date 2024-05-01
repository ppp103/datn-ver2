import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

export function numberValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = /^\d+$/.test(control.value);
  return valid
    ? null
    : { invalidNumber: { valid: false, value: control.value } };
}

// validation input message error
// export function validationErrorMessagesService(
//   form: FormGroup,
//   validationErrorMessages: any,
//   formErrors: any
// ) {
//   Object.keys(form.controls).forEach((key: string) => {
//     const abstractControl = form.get(key);
//     formErrors[key] = '';
//     if (
//       abstractControl &&
//       !abstractControl.valid &&
//       (abstractControl.touched || abstractControl.dirty)
//     ) {
//       const message = validationErrorMessages[key];
//       for (const errorKey in abstractControl.errors) {
//         if (errorKey) {
//           formErrors[key] += message[errorKey] + '';
//         }
//       }
//     }
//     if (abstractControl instanceof FormGroup) {
//       validationErrorMessages(abstractControl);
//     }
//   });
// }

export function validationAllErrorMessagesService(form: FormGroup, validationErrorMessages: any, formErrors: any) {
  Object.keys(form.controls).forEach((key: string) => {
    const abstractControl = form.get(key);
    formErrors[key] = '';
    if (abstractControl && !abstractControl.valid) {
      const message = validationErrorMessages[key];
      for (const errorKey in abstractControl.errors) {
        if (errorKey) {
          if (errorKey == "owlDateTimeParse") {
            formErrors[key] += message['wrongFormat'] + "\n";
          } else {
            formErrors[key] += message[errorKey] + "\n";
          }
        }
      }
    }
    if (abstractControl instanceof FormGroup) {
      validationErrorMessages(abstractControl);
    }
  });
}
