import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormComponent } from '../../dialogs/course-form/course-form.component';
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
  @Output() public onToggleCourse: EventEmitter<CourseListType> =
    new EventEmitter();
  constructor(private _matDialog: MatDialog) {}

  ngOnInit(): void {}
  // add correction
  public revealOrHide(course: CourseListType) {
    course.isSelected = !course.isSelected;
    console.log(`Course was toggled : ${course.isSelected}`);
    this.onToggleCourse.emit(course);
  }

  public addCourse() {
    const dialogRef = this._matDialog.open(CourseFormComponent, {
      width: '250px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  public remove() {
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
