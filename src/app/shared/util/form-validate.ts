import { FormGroup, FormControl, FormArray } from '@angular/forms';

export class FormValidate {
    public isPristine(form: FormGroup) {
        let pristine = true;
        Object.values(form.controls).forEach(control => pristine = pristine && control.pristine);
        return pristine;
    }
}