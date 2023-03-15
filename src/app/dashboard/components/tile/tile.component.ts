import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit {
  constructor(private router: Router) {} // contient le service routeur
  @Input() public tileInfo: any;

  ngOnInit(): void {}

  public onClick(object: any): void {
    console.log(`A button was clicked: ${object.title}`);
    if (this.tileInfo.title === 'Students') {
      //this.router.navigate(['/student/list']); // pour evité de l'écrire en dur on utilise (object.action)
      this.router.navigate(object.action); // => dashboard component => action: ['/','student','list']
    }
  }
}
