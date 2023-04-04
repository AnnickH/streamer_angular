import { DatePipe, Time } from '@angular/common';
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
  public timeModule: number = 0; // number = int

  constructor() {}

  ngOnInit(): void {}

  public reveal(module: ModuleType) {
    module.isSelected = !module.isSelected;
    console.log(`module : ${module.isSelected}`);
    this.onToggleCourse.emit(module);
  }

  public getMediaTime(medias: MediaType[]): String {
    let j: number = 0;

    for (let i = 0; i < medias.length; i++) {
      j = j + medias[i].duration;
    }
    const minutes: number = Math.floor(j / 60);
    const second: number = j % 60;

    const extend: string = second < 9 ? '0' : '';
    return minutes + ' min ' + extend + second + ' s ';
  }

  onMediasToggle(media: MediaType): void {
    console.log(
      `Course was toggled ${media.isSelected ? 'close all but me' : 'close me'}`
    );
    if (media.isSelected) {
      this.modules
        .filter((inMedia: ModuleType) => inMedia.isSelected)
        .forEach((inMedia: ModuleType) => {
          if (media.id !== inMedia.id) {
            inMedia.isSelected = false;
          }
        });
    }
  }

  revealOrHide(module: ModuleType): void {
    module.isSelected = !module.isSelected;
    if (module.isSelected) {
      this.modules
        .filter((inModule: ModuleType) => inModule.isSelected)
        .forEach((inModule: ModuleType) => {
          if (module.id !== inModule.id) {
            inModule.isSelected = false;
          }
        });
    }
  }

  public toggle(moduleStatus: boolean, module: any): void {
    this.modules.forEach((mod) => {
      if (mod.id === module.id) {
        console.log(JSON.stringify(moduleStatus) + 'cc');
        mod.isSelected = moduleStatus;
      }
    });

    // this.modules.forEach((module) => {
    //   module.isSelected = moduleStatus;
    // });

    // this.onToggleCourse.emit(this._module);
  }
}
