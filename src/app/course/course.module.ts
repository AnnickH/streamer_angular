import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { ListComponent } from './list/list.component';
import { CourseTileComponent } from './components/course-tile/course-tile.component';
import { ModuleListComponent } from './components/module-list/module-list.component';

import { AppComponent } from '../app.component';
import { SharedModule } from '../shared/shared.module';
import { MediaComponent } from './components/media/media.component';
import { CourseFormComponent } from './dialogs/course-form/course-form.component';
import { CourseAddComponent } from './dialogs/course-add/course-add.component';
import { CourseRemoveComponent } from './dialogs/course-remove/course-remove.component';

@NgModule({
  declarations: [
    CourseTileComponent,
    ModuleListComponent,
    ListComponent,
    MediaComponent,
    CourseFormComponent,
    CourseAddComponent,
    CourseRemoveComponent,
  ],
  imports: [CourseRoutingModule, SharedModule, CommonModule],
})
export class CourseModule {}
