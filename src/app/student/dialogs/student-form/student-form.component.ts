import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentModel } from '../../models/student-model';
import { StudentFormService } from '../../services/student-form.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  public okButtonLabel: string = 'Add';

  public form: FormGroup = new FormGroup({});

  private _student: StudentModel;

  constructor(
    public dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _studentFormService: StudentFormService
  ) {
    this._student = this.data.student;
    if (this._student.id) {
      this.okButtonLabel = 'update';
    }
  }

  ngOnInit(): void {
    this._studentFormService.buildForm(this._student); //je creer mon form et je lui donne le student qui a été créer
    this.form = this._studentFormService.form; // je recupère le form
    console.log(`Dialog got ${JSON.stringify(this._student)}`);
  }
  public get c(): { [key: string]: AbstractControl } {
    return this._studentFormService.c;
  }
  /**
   * Event triggered if user click on the No button
   */
  public onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Event triggered if user clivk on Yes button
   */
  public onSubmit(): void {
    this._studentFormService.onSubmit().subscribe((student: StudentModel) => {
      //on appelle notre service qui appelle 1 autre qui lui fait appelle a la base de donnée
      this.dialogRef.close(student); // retourne le student mit à jour
    });
  }
}
