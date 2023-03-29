import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { StudentFormComponent } from '../dialogs/student-form/student-form.component';
import { IStudent } from '../interfaces/i-student';
import { StudentModel } from '../models/student-model';
import { StudentService } from '../services/student.service';
import { HttpResponse } from '@angular/common/http';

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
    private _cd: ChangeDetectorRef,
    private _matDialog: MatDialog
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
        this.students.sort((s1: IStudent, s2: IStudent) => s1.id! - s2.id!); //trie l'ordre des id
        console.log(students);
        console.log(`Got ${students.length} students`);
      }); //tuyau responsable d'une tâche
  }

  public delete(student: any): void {
    if (student.isSelected === true) {
      this._studentService.remove(student.id).subscribe({
        next: (response: HttpResponse<any>) => {
          this.students.splice(this.students.indexOf(student), 1);
        },
      });
      alert(
        `Succes` +
          student.lastName +
          ` ` +
          student.firstName +
          ` has been deleted`
      );
    } else {
      console.log(`rien`);
      alert(`Nothing was selected`);
    }
  }
  /* public delete(object: any): void {
    const lineElement = document.querySelector(`[data="${object}"]`);
    if (object.isSelected === true) {
      console.log(
        `Supprimer le student  ` +
          object.lastName +
          ` ` +
          object.firstName +
          ` ` +
          lineElement
      );
    } else {
      console.log(`rien`);
    }
  } */

  public multiDelete(student: any): void {
    const lineElement = document.querySelector(`[data="${student}"]`);
    if (student.isSelected === true) {
      console.log(student.isSelected.count + `element selected`);
      console.log(
        student.lastName +
          ` ` +
          student.firstName +
          ` ` +
          lineElement +
          this.students
      );
    } else {
      console.log(`rien`);
      console.log(this.students);
    }
  }

  public openForm(student: IStudent | null = null): void {
    if (!student) {
      this._openDialog(new StudentModel());
    } else {
      this._studentService
        .findOne(student.id!)
        .subscribe((completeStudent: StudentModel) => {
          this._openDialog(completeStudent);
        });
    }
  }

  public onClick(object: any): void {
    // if (object.title)
    console.log(`previous`);
    this.router.navigate(['/dashboard']);
  }
  public clickOn(object: any) {
    console.log(
      ` You have selected a student, LastName: ` +
        object.lastName.toUpperCase() +
        ` And FirstName: ` +
        object.firstName
    );
    this.router.navigate(['/', 'student', object.id, 'update']);
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

  private _openDialog(student: StudentModel): void {
    const dialogRef = this._matDialog.open(StudentFormComponent, {
      width: '500px',
      height: '700px',
      hasBackdrop: false,
      data: { student }, // student is passed to dialog => {student: student}
      panelClass: 'my-dialog-class',
    });
    console.log(`Open the add modal`);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        //convert StudentModel to SimpleStudent(or Istudent)
        const iStudent: IStudent = {
          id: result.id,
          lastName: result.lastName,
          firstName: result.firstName,
          email: result.email,
          login: result.login,
          password: result.password,
          isSelected: false,
        };
        console.log(`Dialog result: ${JSON.stringify(result)}`);
        //if student already exists in students: replace it
        const index: number = this.students.findIndex(
          //findIndex return le premier elever dans le tableau trouver sinon il renvoie un -1 qui signifie qu'il n'exite pas
          (student: IStudent) => student.id === iStudent.id
        );
        if (index > -1) {
          this.students.splice(index, 1, iStudent);
        } else {
          this.students.push(iStudent);
        }
        //else add it (and re sort table)
        this.students.sort((s1: IStudent, s2: IStudent) => s1.id! - s2.id!);
      } else {
        console.log(`No result, lunch time`);
      }
    });
  }

  // }
}
