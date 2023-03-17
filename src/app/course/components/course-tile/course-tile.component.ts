import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseListType } from '../../types/course-list-type';

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
}
