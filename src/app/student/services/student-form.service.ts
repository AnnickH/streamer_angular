import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StudentModel } from '../models/student-model';

@Injectable({
  providedIn: 'root',
})
export class StudentFormService {
  private _form: FormGroup = new FormGroup({});
  private _student: StudentModel = new StudentModel();

  constructor(
    //injection de dépendance dans le parametre du constructeur()
    private _formBuilder: FormBuilder
  ) {
    this._buildForm(); //formulaire vide
  }

  public get c(): { [key: string]: AbstractControl } {
    return this._form.controls;
  }
  public buildForm(student: StudentModel) {
    this._student = student;
    this._buildForm();
  }

  /**
   * studentFormService.form <- this._form
   */
  get form(): FormGroup {
    //getter magic
    return this._form; // attention a bien mettre _ sinon boucle sur le getter
  }

  private _buildForm(): void {
    this._form = this._formBuilder.group({
      lastName: [this._student.lastName, [Validators.required]],
      firstName: [this._student.firstName],
      phoneNumber: [this._student.phoneNumber],
      email: [
        this._student.email,
        [
          Validators.required,
          Validators.pattern(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/), // expressions regulière
        ],
      ],

      login: [
        this._student.login,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      password: [
        this._student.password,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
          ),
        ],
      ],
    });
  }
}
