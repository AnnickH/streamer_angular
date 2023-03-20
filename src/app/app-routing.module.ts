import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './student/list/list.component';
import { SharedModule } from './shared/shared.module';
import { AddComponent } from './student/add/add.component';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes), SharedModule],
  exports: [RouterModule], // il exporte , c'est grace a cet export que je peux utiliser router service et routeur name
})
export class AppRoutingModule {
  public static readonly routes: Routes = [
    {
      path: '', // Mean : http://localhost:4200
      redirectTo: 'dashboard', // Redirect to another Route object
      pathMatch: 'full', // Mean Angular read the whole URI instead of first matching occ
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'student/list',
      component: ListComponent,
    },
    {
      path: 'student/add',
      component: AddComponent,
    },
    {
      path: 'course',
      loadChildren: () =>
        import(`./course/course.module`).then((m) => m.CourseModule),
    },
    {
      path: '**', // n'importe quelle chemin qui n'existe pas dans le routeur, toujours le dernier rencontré
      redirectTo: 'dashboard', // Or any 404 component you want!
      pathMatch: 'full',
    },
  ];
}
