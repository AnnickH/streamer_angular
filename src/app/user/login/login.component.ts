import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public hide: Boolean = false;

  constructor() {}

  timeout: any;
  ngOnInit(): void {
    const loginControl: AbstractControl = new FormControl('', [
      Validators.required,
    ]);
    const passwordControl: AbstractControl = new FormControl('', [
      Validators.required,
    ]);

    this.form.addControl('login', loginControl);
    this.form.addControl('password', passwordControl);
  }

  revealOrHide(): void {
    this.hide = !this.hide;
    if (this.hide === true) {
      console.log('cc');

      setTimeout(() => (this.hide = false), 2000);
    }
  }
}
