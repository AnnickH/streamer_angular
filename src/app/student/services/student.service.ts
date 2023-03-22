import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IStudent } from '../interfaces/i-student';
import { StudentModel } from '../models/student-model';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly endpoint: string = `${environment.apiRootUri}students`;
  constructor(
    private _httpClient: HttpClient // DI Angular
  ) {} // utilise le service http qui est importer dans student.module.ts

  /**
   * Send a GET request to http://127.0.0.1:5000/v1/students
   * @returns Observable<IStudent>
   */
  public findAll(): Observable<IStudent[]> {
    return this._httpClient.get<IStudent[]>(this.endpoint);
  }

  public findOne(id: number): Observable<StudentModel> {
    return this._httpClient.get<any>(this.endpoint + '/' + id).pipe(
      tap((response: any) => {
        //permet d'intercepté les réponses de l'étape juste avant (voir ce qu'il contient)
        console.log(JSON.stringify(response));
      }),
      take(1),
      map((student: any) => student)
    );
  }

  public findByEmail(email: string): void {}

  public findByLoginOrEmail(email: string, login: string): void {}

  public add(student: IStudent): Observable<any> {
    console.log(`Controller send ${JSON.stringify(student)}`);
    return this._httpClient
      .post<IStudent>(this.endpoint, student)
      .pipe(take(1));
    // .subscribe({
    //   next: (reponse: IStudent) => {
    //     //si la requete réussi
    //     console.log(JSON.stringify(reponse));
    //   },
    //   error: (error: any) => {
    //     console.log(`Something went wrong: ${JSON.stringify(error)}`);
    //   },
    // });
  }

  public update(student: StudentModel): Observable<HttpResponse<any>> {
    return this._httpClient.put<StudentModel>(this.endpoint, student, {
      observe: 'response',
    });
  }

  public remove(student: StudentModel): void {}

  public findSimpleStudents() {
    return this._httpClient.get<IStudent[]>(this.endpoint + '/simple');
    // endpoint:http://127.0.0.1:5000/v1/students + /simple qui renvoie à StudentController  @GetMapping("simple") du back
  }
}
