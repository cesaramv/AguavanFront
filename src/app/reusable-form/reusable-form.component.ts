import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-reusable-form',
  templateUrl: './reusable-form.component.html',
  styleUrls: ['./reusable-form.component.css']
})
export class ReusableFormComponent implements OnInit {
  form: FormGroup;
  constructor(private readonly formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      password: [],
      profile: []
    })
  }

  submit() {
    console.log(this.form.value);
  }

  ngOnInit(): void {
  }

}
