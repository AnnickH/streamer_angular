import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MediaType } from '../../types/media-type';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  @Input() medias: MediaType[] = [];
  @Output() public onToggleMedia: EventEmitter<MediaType> = new EventEmitter();
  constructor(private router: Router) {}

  ngOnInit(): void {}
  public reveal(media: MediaType) {
    media.isSelected = !media.isSelected;
    console.log(`media : ${media.isSelected}`);
    this.onToggleMedia.emit(media);
  }
}
