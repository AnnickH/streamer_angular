import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CourseService } from '../services/course.service';
import { CourseType } from '../types/course-type';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModuleType } from '../types/module-type';
import { title } from 'process';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() public tileInfo: any;
  constructor(
    private _courseService: CourseService,
    private router: Router, //injection de studentService
    private _cd: ChangeDetectorRef
  ) {}
  courses: CourseType[] = [];
  hiddenSection: CourseType | null = null;
  modules: ModuleType[] = [];

  ngOnInit(): void {
    this._courseService
      .findAll() // findAll -> charge toute les données, findSimpleEtudiant refère a la fonction défini en back, et prend que ce qu'on a besoin
      .pipe(
        take(1) //observe quand la donnée est disponible return que la list des students et retourne là
      )
      .subscribe((courses: CourseType[]) => {
        //reccupère les données qui ont déjà été manipulée
        this.courses = courses;
        console.log(courses);
      });
    console.log('c');
  }

  public onClick(object: any): void {
    // if (object.title)
    console.log(`previous`);
    this.router.navigate(['/dashboard']);
  }

  public cli(object: any): void {
    const selectedCourse = this.courses.find(
      (course) => course.title === 'Dicta eos beatae'
    );
    if (selectedCourse) {
      const moduleName = selectedCourse.modules[1].name; // Assuming that there is at least one module in the selected course
      this.showModules = true;
    }
  }
  public showModules: boolean = false;
}
