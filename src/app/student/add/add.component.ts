import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  // va nous permettre de collection des contrôles de formulaire (un champ), avec toutes les spécificités
  constructor(
    private _formBuilder: FormBuilder //vient de la librairie angularFroms, utilitaire qui construit un formulaire
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
  }
}
