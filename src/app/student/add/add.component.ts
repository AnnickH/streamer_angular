import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  EmailValidator,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StudentService } from '../services/student.service';
import { IStudent } from '../interfaces/i-student';
import { StudentModel } from '../models/student-model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public student: StudentModel = new StudentModel();

  isSubmitting = false;
  // va nous permettre de collection des contrôles de formulaire (un champ), avec toutes les spécificités
  constructor(
    private _formBuilder: FormBuilder, //vient de la librairie angularFroms, utilitaire qui construit un formulaire
    private _service: StudentService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      //group defini le controle des champs d'un formulaire
      lastName: [
        //caractéristique transmit dans un tableau, contrainte dans le tableau
        '', //Default value
        [Validators.required], //Validator function to add to this field (contient les fonctions de validation, requit)
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/), // permet de fixer des contraintes, expressions regulière
        ],
      ],
      firstName: [''],
      phoneNumber: [''],
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
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

  public get c(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public onSubmit(): void {
    console.log(`Form was submitted`);
    this._service.add(this.form.value).subscribe({
      next: (reponse: IStudent) => {
        //si la requete réussi
        this._snackBar.open('Student was created', 'Ok');
        // console.log(JSON.stringify(reponse));
        this._router.navigate(['/', 'student', 'list']);
      },
      error: (error: any) => {
        this._snackBar.open('Student was not created', 'Close');
        //  if (error.status === 409){
        //
        // }
        // console.log(`Something went wrong: ${JSON.stringify(error)}`);
      },
    });

    // this.isSubmitting = true;
    // if (this.form.valid) {
    //   this._snackBar.open(
    //     'Tout les champs ont été saisie et enregistré',
    //     'OK',
    //     {
    //       duration: 3000,
    //       verticalPosition: 'bottom',
    //     }
    //   );
    //   this.isSubmitting = false;
    //   return;
    // } else {
    //   this._snackBar.open('Je ne peux pas envoyé votre demande', 'Fermer', {
    //     duration: 3000,
    //     verticalPosition: 'bottom',
    //   });
    // }
  }

  // openSnackBar(message: string, action: string) {
  //   this._router
  //     .navigate(['/student/list'])
  //     .then(() => {
  //       this._snackBar.open('Navigation réussie !', 'Fermer', {
  //         duration: 3000,
  //         verticalPosition: 'bottom',
  //       });
  //     })
  //     .catch(() => {
  //       this._snackBar.open(
  //         'Une erreur est survenue lors de la navigation',
  //         'Fermer',
  //         {
  //           duration: 3000,
  //           verticalPosition: 'bottom',
  //           panelClass: ['snackbar-error'],
  //         }
  //       );
  //     });
  // }
}
