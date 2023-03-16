import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IStudent } from 'src/app/student/interfaces/i-student';
import { StudentModel } from 'src/app/student/models/student-model';
import { CourseModel } from '../models/course-model';
import { CourseType } from '../types/course-type';
import { SharedModule } from 'src/app/shared/shared.module';

import { environment } from './../../../environments/environment';

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
  public findAll(): Observable<CourseType[]> {
    return this._httpClient.get<CourseType[]>(this.endpoint);
  }

  public findOne(id: number): void {}

  public findByEmail(email: string): void {}

  public findByLoginOrEmail(email: string, login: string): void {}

  public add(courses: CourseType): void {}

  public update(courses: CourseModel): void {}

  public remove(courses: CourseModel): void {}

  public findSimpleCourse() {
    return this._httpClient.get<IStudent[]>(this.endpoint + '/simple');
    // endpoint:http://127.0.0.1:5000/v1/students + /simple qui renvoie à StudentController  @GetMapping("simple") du back
  }
}
