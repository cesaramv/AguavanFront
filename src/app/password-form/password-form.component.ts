import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormBuilder,
  ControlValueAccessor,
  Validators,
  NG_VALIDATORS,
  FormControl
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { matchingInputsValidator } from './validators';

export interface PasswordFormValues {
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordFormComponent),
      multi: true
    }
  ]
})
export class PasswordFormComponent implements OnInit, ControlValueAccessor, OnDestroy {

  form: FormGroup;
  subscriptions: Subscription[] = [];
  get value(): PasswordFormValues {
    return this.form.value;
  }

  set value(value: PasswordFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get passwordControl() {
    return this.form.controls.password;
  }

  get confirmPasswordControl() {
    return this.form.controls.confirmPassword;
  }
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      { validator: matchingInputsValidator('password', 'confirmPassword') }
    );
    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
   }
  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }

    if (obj === null) {
      this.form.reset();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  validate(_: FormControl) {
    return this.form.valid ? null : { passwords: { valid: false } };
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
  }

  onChange: any = () => {};
  onTouched: any = () => {};

}
