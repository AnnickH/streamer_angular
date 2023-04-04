import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './student/list/list.component';
import { SharedModule } from './shared/shared.module';
import { AddComponent } from './student/add/add.component';
import { UpdateComponent } from './student/update/update.component';
import { MediaComponent } from './course/components/media/media.component';
import { CourseAddComponent } from './course/dialogs/course-add/course-add.component';
import { NoAuthGuard } from './user/guards/no-auth.guard';
import { UserRoutingModule } from './user/user-routing.module';
import { AuthGuard } from './user/guards/auth.guard';

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
      canActivate: [AuthGuard],
    },

    {
      path: 'student/list',
      component: ListComponent,
      canActivate: [AuthGuard],
    },

    {
      path: 'student/add',
      component: AddComponent,
      canActivate: [AuthGuard],
    },

    {
      path: 'media/list',
      component: MediaComponent,
      canActivate: [AuthGuard],
    },

    {
      path: 'student/:id/update', // :id => sera remplacé par l'ID d'un Student à l'exécution
      component: UpdateComponent,
      canActivate: [AuthGuard],
    },

    {
      path: 'course',
      loadChildren: () =>
        import(`./course/course.module`).then((m) => m.CourseModule),
      canActivate: [AuthGuard],
    },
    {
      path: 'user',
      loadChildren: () =>
        import('./user/user.module').then((m) => m.UserModule),
    },
    {
      path: 'course/add',
      component: CourseAddComponent,
      canActivate: [AuthGuard],
    },

    {
      path: '**', // n'importe quelle chemin qui n'existe pas dans le routeur, toujours le dernier rencontré
      redirectTo: 'dashboard', // Or any 404 component you want!
      pathMatch: 'full',
    },
  ];
}
