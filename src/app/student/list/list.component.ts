import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { IStudent } from '../interfaces/i-student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public byIdSortOrder: number = -1;
  public byLastNameSortOrder: number = 1;
  public sortDefault: string = 'id';
  public checkUncheckAll: boolean = false; // défini false

  @Input() public tileInfo: any;
  constructor(
    private _studentService: StudentService,
    private router: Router, //injection de studentService
    private _cd: ChangeDetectorRef
  ) {}
  students: IStudent[] = [];

  ngOnInit(): void {
    this._studentService
      .findSimpleStudents() // findAll -> charge toute les données, findSimpleEtudiant refère a la fonction défini en back, et prend que ce qu'on a besoin
      .pipe(
        take(1) //observe quand la donnée est disponible return que la list des students et retourne là
      )
      .subscribe((students: IStudent[]) => {
        //reccupère les données qui ont déjà été manipulée
        this.students = students;
        console.log(students);
        console.log(`Got ${students.length} students`);
      }); //tuyau responsable d'une tâche
  }

  public onClick(object: any): void {
    // if (object.title)
    console.log(`previous`);
    this.router.navigate(['/dashboard']);
  }

  sortById(order: 'asc' | 'desc') {
    this.students.sort((studentA, studentB) => {
      const idA = studentA.id ?? 0;
      const idB = studentB.id ?? Number.MAX_VALUE;
      return order === 'asc' ? idA - idB : idB - idA;
    });
  }
  // méthode de tri pour le nom de famille
  sortByLastName(order: 'asc' | 'desc') {
    this.students.sort((a, b) =>
      order === 'asc'
        ? a.lastName.localeCompare(b.lastName)
        : b.lastName.localeCompare(a.lastName)
    );
  }

  public byId(): void {
    this.students.sort(
      (s1: IStudent, s2: IStudent) => (s1.id! - s2.id!) * this.byIdSortOrder
    );
    this.byIdSortOrder = this.byIdSortOrder * -1;
    this.sortDefault = 'id';
  }
  public byLastname(): void {
    this.students.sort(
      (s1: IStudent, s2: IStudent) =>
        s1.lastName.localeCompare(s2.lastName) * this.byLastNameSortOrder
    );
    this.byLastNameSortOrder = this.byLastNameSortOrder * -1;
    this.sortDefault = 'lastName';
  }

  public onSelectStudent(student: IStudent): void {
    // method 1:
    this.checkUncheckAll =
      this.students.filter((s: IStudent) => s.isSelected).length === //((s:...) => ..)compare l'élément avec l'état de la boite
      this.students.length; // nombre total dans la liste

    //method 2:
    /* const checkedStudent: IStudent[] = [];
     for (const s of this.students) {
      if (s.isSelected) {
        checkedStudent.push(s);
      }
    }
    this.checkUncheckAll = checkedStudent.length === this.students.length; */

    /* // method 3:
    const checkedStudent: IStudent[] = [];
    this.students.forEach((s: IStudent) => {
      if (s.isSelected) checkedStudent.push(s);
    });
    this.checkUncheckAll = checkedStudent.length === this.students.length; */
  }

  public onCheckUncheckAll(): void {
    /*    this.students = this.students.map((s) => {
      return { ...s, isSelected: this.checkUncheckAll }; */
    // prend moi la liste des students, return a chaque fois que tu trouves un object student, destructure moi l'objet (...s)=> attribut valeur, mais tu me prends pas tout,
    // isSelected change lui de tête en fonction de ce qui se passe

    this.students.forEach(
      (s: IStudent) => (s.isSelected = this.checkUncheckAll)
    );
  }
  // }
}
