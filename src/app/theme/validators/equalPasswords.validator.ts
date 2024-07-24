import {UntypedFormGroup} from '@angular/forms';

export class EqualPasswordsValidator {

  public static validate(firstField, secondField) {

    return (c:UntypedFormGroup) => {

      return (c.controls && c.controls[firstField].value == c.controls[secondField].value) ? null : {
        passwordsEqual: {
          valid: false
        }
      };
    }
  }
}
