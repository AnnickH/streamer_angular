import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { CourseModel } from '../../models/course-model';
import { CourseService } from '../../services/course.service';
import { CourseType } from '../../types/course-type';
import { CourseAddComponent } from '../course-add/course-add.component';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public course: CourseModel | null = null;
  constructor(
    private _course: CourseService,
    private _courses: CourseAddComponent,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  get c(): { [key: string]: AbstractControl } {
    return this._courses.c;
  }
  onSubmit(): void {
    this.course!.title = this.c['title'].value;
    this.course!.objective = this.c['objective'].value;
    this._course.update(this.course!).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(`Course was updated ${response.status}`);
      },
      error: (error: any) => {
        console.log(JSON.stringify(error));
      },
    });
  }
}
