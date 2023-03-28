import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MediaType } from '../../types/media-type';
import { ModuleType } from '../../types/module-type';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss'],
})
export class ModuleListComponent implements OnInit {
  @Input() modules: ModuleType[] = [];
  @Output() public onToggleCourse: EventEmitter<ModuleType> =
    new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public reveal(module: ModuleType) {
    module.isSelected = !module.isSelected;
    console.log(`module : ${module.isSelected}`);
    this.onToggleCourse.emit(module);
  }
}
