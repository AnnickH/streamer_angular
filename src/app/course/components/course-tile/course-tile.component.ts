import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseListType } from '../../types/course-list-type';
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
  constructor() {}

  ngOnInit(): void {}
  // add correction
  public revealOrHide(course: CourseListType) {
    course.isSelected = !course.isSelected;
    console.log(`Course was toggled : ${course.isSelected}`);
    this.onToggleCourse.emit(course);
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
}
