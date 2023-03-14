import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() public tileInfo: any;

  ngOnInit(): void {}

  public onClick(object: any): void {
    console.log(`A button was clicked: ${object.title}`);
    if (this.tileInfo.title === 'Students') {
      this.router.navigate(['/student/list']);
    }
  }
}
