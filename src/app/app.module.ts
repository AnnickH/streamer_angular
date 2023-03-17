import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TileComponent } from './dashboard/components/tile/tile.component';
import { StudentModule } from './student/student.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, DashboardComponent, TileComponent],
  imports: [BrowserModule, AppRoutingModule, StudentModule, SharedModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent], //moi appModule je vais demarrer avec un composant app component
})
export class AppModule {}
