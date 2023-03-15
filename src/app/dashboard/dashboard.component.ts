import { Component, OnInit } from '@angular/core';
import { AnyTxtRecord } from 'dns';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  /**
   * Tiles to display un the HTML template
   */
  public tiles: Array<any> = [];

  /**
   * Specify is a "user" is admin or not (default false)
   */
  public isAdmin: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.tiles.push(
      {
        title: 'Parameters',
        summary: 'Parameters management',
        action: ['dashboard'],
      },
      {
        title: 'Students',
        summary: 'Add, remove, view students',
        action: ['/', 'student', 'list'], // action: ['dashboard'],
      },
      {
        title: 'Courses',
        summary: 'Manage courses and medias',
        action: ['dashboard'],
      }
    );
  } //implemente l'interface OnInit

  public onClick(object: any): void {
    this.tiles.splice(this.tiles.indexOf(object), 1); //slice dépile un élément du tableau, et enlève le visuel
    // console.log(`A button was clicked: ${object.title}`);
  }

  // public click(): void {
  //   this.isAdmin = !this.isAdmin;
  // }
}
