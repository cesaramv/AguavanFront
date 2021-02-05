import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { 
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroup, FormBuilder, Validators,
  NG_VALIDATORS,
  FormControl
 } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true
    }
  ]
})
export class ProfileFormComponent implements OnInit, ControlValueAccessor, OnDestroy {

  form: FormGroup;
  subs: Subscription[] = [];

  get value(){
    return this.form.value;
  }

  set value(value: ProfileFormValues){
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get emailControl(){
    return this.form.controls.email;
  }

  constructor(private readonly formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      firstName: [],
      lastName: [],
      email: ['', Validators.required]
    });

    this.subs.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  writeValue(obj: any): void {
    if(obj){
      this.value = obj;
    }
    if(obj === null){
      this.form.reset();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched(fn);
  }
  validate(_: FormControl) {
    return this.form.valid ? null : { profile: { valid: false } };
  }
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void {
  }

}

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: number;
}
