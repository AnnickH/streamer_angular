import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseModel } from '../../models/course-model';
import { CourseFormComponent } from '../course-form/course-form.component';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss'],
})
export class CourseAddComponent implements OnInit {
  public okButtonLabel: string = 'CREATE';
  public form: FormGroup = new FormGroup({});
  private _course: CourseModel = new CourseModel();
  constructor(private _formBuilder: FormBuilder, private _router: Router) {
    this._buildForm();
  }

  ngOnInit(): void {}

  public onSubmit() {
    this._course.title = this.c['title'].value;
    this._course.objective = this.c['objective'].value;
    alert(
      'Le course : ' +
        this._course.title +
        ', va être ajouté. Vous allez être rediriger vers la page des courses'
    );
    this._router.navigate(['course/list']);

    // if () {

    // }
  }
  public get c(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public buildForm(course: CourseModel) {
    //Pour update
    this._course = course; //Pour update, recupère les données
    this._buildForm();
  }

  private _buildForm() {
    // construire le formulaire
    this.form = this._formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      objective: [''], // champ vide pour pouvoir ajouter
    });
  }
}
