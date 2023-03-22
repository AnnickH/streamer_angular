import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { ListComponent } from './list/list.component';
import { CourseTileComponent } from './components/course-tile/course-tile.component';
import { ModuleListComponent } from './components/module-list/module-list.component';

import { AppComponent } from '../app.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CourseTileComponent, ModuleListComponent, ListComponent],
  imports: [CourseRoutingModule, SharedModule],
})
export class CourseModule {}