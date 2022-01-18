import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowAddEmployeeBtnText]'
})
export class ShowAddEmployeeBtnTextDirective implements OnInit {
  btn: HTMLButtonElement;
  text: HTMLSpanElement;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  
  ngOnInit() {
    this.btn = this.elRef.nativeElement;
    this.text = this.elRef.nativeElement.querySelector('.add-employee-btn-text');
  }

  @HostListener('mouseover') onMouseOver() {
    this.renderer.addClass(this.btn, 'increase-width');
    this.renderer.addClass(this.text, 'show');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.btn, 'increase-width');
    this.renderer.removeClass(this.text, 'show');
  }
}