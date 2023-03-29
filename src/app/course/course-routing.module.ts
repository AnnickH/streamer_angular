import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CourseAddComponent } from './dialogs/course-add/course-add.component';
import { ListComponent } from './list/list.component';

/* const routes: Routes = []; */

@NgModule({
  imports: [RouterModule.forChild(CourseRoutingModule.routes), SharedModule],
  exports: [RouterModule],
})
export class CourseRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
    {
      path: 'list',
      component: ListComponent,
      pathMatch: 'full',
    },
    {
      path: 'add',
      component: CourseAddComponent,
      pathMatch: 'full',
    },
  ];
}
