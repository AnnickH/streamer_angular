import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  EventEmitter,
  Output,
} from '@angular/core';

@Directive({
  selector: ' toggle' /* [appToggle] */,
})
export class ToggleDirective implements OnInit {
  private _nativeElement;
  private _span: any;
  private _icon: string = '>';
  private _iconStatus: boolean = true;
  // @Input() public element: any;
  @Input() public selectedStatus: boolean = false;
  @Input() public set isExpandable(status: boolean) {
    this._iconStatus = status;
    //on défini un valeur par une méthode, pour modifier un comportement de directive
    if (!status) {
      this._icon = '-';
    } else {
      this._icon = '>';
    }
  }
  @Output() public onToggle: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef //parametre constructeur
  ) {
    //corps du constructeur
    this._nativeElement = _elementRef.nativeElement;
  }

  ngOnInit(): void {
    /* console.log(`Hello i'm a toggle directive`); */
    // this._nativeElement.textContent = '>';
    this._span = this._renderer.createElement('span');
    this._span.textContent = /* '>' */ this._icon;
    this._renderer.setAttribute(
      this._span, //element de l'attribut
      'title', // le nom de l'attribut
      `Show for ${this.selectedStatus ? 'hide' : 'Show'}` // valeur de l'attribut
    );

    //ajouter l'élément (span) au nativeElement
    //add some classes to span
    this._renderer.addClass(this._span, 'icon-list');
    this._renderer.addClass(this._span, 'up');
    this._renderer.appendChild(this._nativeElement, this._span);
  }

  @HostListener('click')
  onClick(): void {
    if (this._iconStatus) {
      // console.log(`Click on ${this.element.title} was detected`);
      this.selectedStatus = !this.selectedStatus;
      if (this.selectedStatus) {
        this._renderer.removeClass(this._span, 'up');
        this._renderer.addClass(this._span, 'down');
      } else {
        this._renderer.removeClass(this._span, 'down');
        this._renderer.addClass(this._span, 'up');
      }
      this.onToggle.emit(this.selectedStatus);
    }
  }
}
