import { Component } from '@angular/core';

@Component({
  // @ annotation en angular
  selector: 'app-root', // celui dans index <app-root> = balise, afficher ici
  templateUrl: './app.component.html', // modele de page html
  styleUrls: ['./app.component.scss'], // style de scss appliqué, il va aller cherche ce fichier
})
export class AppComponent {
  public title: string = 'streamer';
}
