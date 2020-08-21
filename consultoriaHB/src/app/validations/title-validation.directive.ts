import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

export function titleValidation(): ValidatorFn {
  return (control: AbstractControl) => {
    const titleValidationDirective = new TitleValidationDirective();
    return titleValidationDirective.validate(control);
  }
 }
 

@Directive({
  selector: '[titleValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: TitleValidationDirective, multi: true}]

})
export class TitleValidationDirective implements Validator {

  

  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    const title = <string>control.value;

    if (!title){return;}
    if (title.length < 3) {
        return {'titleValidation': {'message': 'El título debe contener por lo mínimo 3 caracteres'}}
    }
    if (title.length > 30) {
        return {'titleValidation': {'message': 'El título debe contener por lo máximo 30 caracteres'}}
    }
    /*if (!/^[a-zA-Z0-9]*$/.test(title)){
      return {'titleValidation': {'message': 'Tu título debe de incluir un caracter numérico'}}
    }*/
    
    return null;
    
 

  }

  constructor() { }

}