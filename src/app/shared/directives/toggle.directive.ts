import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  EventEmitter,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Directive({
  selector: ' toggle' /* [appToggle] */,
})
export class ToggleDirective implements OnInit {
  private _nativeElement;
  private _span: any;
  private _icon: string = '>';
  private _nativeIcon: any;
  private _nativeIconContent: string = 'chevron_right';
  private _iconStatus: boolean = true;

  // @Input() public element: any;
  @Input() public selectedStatus: boolean = false;

  @Input() public set isExpandable(status: boolean) {
    this._iconStatus = status;
    //on défini un valeur par une méthode, pour modifier un comportement de directive
    if (!status) {
      // this._elementRef.nativeElement.innerHTML =
      //   '<span class="material-symbols-outlined"> remove </span>';
      this._icon = '-';
      this._nativeIconContent = 'more_horiz';
      // this._elementRef.nativeElement.innerHTML =
      //   '<span class="material-symbols-outlined"> remove </span>';
    } else {
      this._icon = '>';
      this._nativeIconContent = 'chevron_right'; //'toggle_off'
      // this._elementRef.nativeElement.innerHTML =
      //   '<mat-icon>add_circle</mat-icon>';
    }
  }

  @Input() public useIcon: boolean = false;

  @Output() public onToggle: EventEmitter<boolean> = new EventEmitter();

  constructor(
    //parametre constructeur
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef //gère des composants d'angular à partir d'angular
  ) {
    //corps du constructeur
    this._nativeElement = _elementRef.nativeElement;
  }

  ngOnInit(): void {
    /* console.log(`Hello i'm a toggle directive`); */
    // this._nativeElement.textContent = '>';

    this._span = this._renderer.createElement('span');

    if (this.useIcon) {
      // @todo: : check if MatIcon is registred before to
      const icon = this._viewContainerRef.createComponent(MatIcon);
      this._nativeIcon = icon.instance._elementRef.nativeElement;
      this._nativeIcon.textContent = this._nativeIconContent;
      this._renderer.appendChild(this._span, this._nativeIcon);
    } else {
      this._span.textContent = this._icon;
      //add some classes to span
      this._renderer.addClass(this._span, 'icon-list');
      this._renderer.addClass(this._span, 'up');
      this._renderer.setAttribute(
        this._span, //element de l'attribut
        'title', // le nom de l'attribut
        `${this.selectedStatus ? 'Hide' : 'Show'}` // valeur de l'attribut
      );
    }
    this._renderer.appendChild(this._nativeElement, this._span);
    // this._span.textContent = /* '>' */ this._icon;
    // this._renderer.setAttribute(
    //   this._span,
    //   'title',
    //   `Show for ${this.selectedStatus ? 'hide' : 'Show'}`
    // );

    //ajouter l'élément (span) au nativeElement
    //add some classes to span
    // this._renderer.addClass(this._span, 'icon-list');
    // this._renderer.addClass(this._span, 'up');
    // this._renderer.appendChild(this._nativeElement, this._span);
  }

  @HostListener('click')
  onClick(): void {
    if (this._iconStatus) {
      // console.log(`Click on ${this.element.title} was detected`);
      this.selectedStatus = !this.selectedStatus;
      this.onToggle.emit(this.selectedStatus);
      if (!this.useIcon) {
        if (this.selectedStatus) {
          this._renderer.removeClass(this._span, 'up');
          this._renderer.addClass(this._span, 'down');
        } else {
          this._renderer.removeClass(this._span, 'down');
          this._renderer.addClass(this._span, 'up');
        }
      } else {
        if (this.selectedStatus) {
          this._nativeIcon.textContent = 'expand_more'; //'toggle_on'
        } else {
          this._nativeIcon.textContent = 'chevron_right'; //'toggle_off'
        }
      }
    }
  }
}