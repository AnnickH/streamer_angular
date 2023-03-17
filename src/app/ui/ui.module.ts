import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    ...UiModule.materials, // ... spread operator => prend tout les éléments et les transformes en list
    // on peut très bien juste mettre l'export de MatToolbarModule
  ],
})
export class UiModule {
  public static materials = [MatToolbarModule];
}
