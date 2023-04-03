import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { ToggleDirective } from './directives/toggle.directive';

@NgModule({
  declarations: [ToggleDirective],
  imports: [CommonModule],
  exports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    UiModule,
    ReactiveFormsModule,
    ToggleDirective,
  ],
})
export class SharedModule {}
