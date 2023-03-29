import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CourseFormComponent } from '../../dialogs/course-form/course-form.component';
import { CourseRemoveComponent } from '../../dialogs/course-remove/course-remove.component';
import { CourseListType } from '../../types/course-list-type';
import { CourseType } from '../../types/course-type';
import { ModuleType } from '../../types/module-type';

@Component({
  selector: 'app-course-tile',
  templateUrl: './course-tile.component.html',
  styleUrls: ['./course-tile.component.scss'],
})
export class CourseTileComponent implements OnInit {
  //add input and output
  @Input() public course!: CourseListType;
  public tileInfo: any;
  @Output() public onToggleCourse: EventEmitter<CourseListType> =
    new EventEmitter();
  constructor(private _matDialog: MatDialog, private _router: Router) {}

  ngOnInit(): void {}
  // add correction
  public revealOrHide(course: CourseListType) {
    course.isSelected = !course.isSelected;
    console.log(`Course was toggled : ${course.isSelected}`);
    this.onToggleCourse.emit(course);
  }

  public remove(course: CourseListType) {
    console.log(course);
    const dialogRef = this._matDialog.open(CourseRemoveComponent, {
      width: 'flex',
      height: 'flex',
      data: course,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        console.log('Delete');
      }
      if (result === 'cancel') {
        console.log('The dialog was closed');
      }
    });
    console.log(`cc remove`);
  }

  public update() {
    console.log(`cc update`);
  }

  public view() {
    console.log(`cc view`);
  }

  /* onMediasToggle(module: ModuleType): void {
    console.log(
      `Course was toggled ${
        module.isSelected ? 'close all but me' : 'close me'
      }`
    );
    if (module.isSelected) {
      this.
        .filter((inMedia: ModuleType) => inMedia.isSelected)
        .forEach((inMedia: ModuleType) => {
          if (module.id !== inMedia.id) {
            inMedia.isSelected = false;
          }
        });
    }
  } */
  private _openDialog(course: CourseType): void {
    const dialogRef = this._matDialog.open(CourseTileComponent, {
      width: '500px',
      height: '700px',
      hasBackdrop: false,
      data: { message: 'hello word' + course.isSelected }, // student is passed to dialog => {student: student}
      panelClass: 'my-dialog-class',
    });
    console.log(`Open the add modal`);
  }
}
