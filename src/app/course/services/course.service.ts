import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IStudent } from 'src/app/student/interfaces/i-student';
import { StudentModel } from 'src/app/student/models/student-model';
import { CourseModel } from '../models/course-model';
import { CourseType } from '../types/course-type';
import { SharedModule } from 'src/app/shared/shared.module';

import { environment } from './../../../environments/environment';
import { CourseListType } from '../types/course-list-type';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly endpoint: string = `${environment.apiRootUri}course`;
  constructor(
    private _httpClient: HttpClient // DI Angular
  ) {} // utilise le service http qui est importer dans student.module.ts

  /**
   * Send a GET request to http://127.0.0.1:5000/v1/students
   * @returns Observable<IStudent>
   */
  public findAll(): Observable<CourseListType[]> {
    return this._httpClient.get<CourseListType[]>(this.endpoint);
  }

  public add(course: CourseModel): Observable<any> {
    return this._httpClient
      .post<CourseModel>(this.endpoint, course)
      .pipe(take(1)); // ?? aligne les element 1 a 1 et take en prend que 1
  }
}
