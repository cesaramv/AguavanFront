import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private readonly translate: TranslateService,
    private readonly formBuilder: FormBuilder,
    //private readonly _location: Location,
    //private readonly loginService: LoginService,
    //rivate readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      cellphone: [null],
      message: [null, [Validators.required]]
    })
  }

  contact(){

  }

}
