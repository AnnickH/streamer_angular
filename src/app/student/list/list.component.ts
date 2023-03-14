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
        // this._cd.detectChanges();
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
}
