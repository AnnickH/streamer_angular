import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  // @ annotation en angular
  selector: 'app-root', // celui dans index <app-root> = balise, afficher ici
  templateUrl: './app.component.html', // modele de page html
  styleUrls: ['./app.component.scss'], // style de scss appliqué, il va aller cherche ce fichier
})
export class AppComponent {
  constructor(
    private _route: Router,
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer
  ) {
    // this._matIconRegistry.addSvgIcon(
    //   'dinosleep',
    //   this._domSanitizer.bypassSecurityTrustResourceUrl(
    //     '../assets/dinosleep.svg'
    //   )
    // );
    this._matIconRegistry.addSvgIcon(
      'sl',
      this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/sl.svg')
    );
  }
  public title: string = 'streamer';
  isLoggedIn = false;

  stop() {
    this._route.navigate(['/', 'user']);
    sessionStorage.clear();

    // add route
  }
}
