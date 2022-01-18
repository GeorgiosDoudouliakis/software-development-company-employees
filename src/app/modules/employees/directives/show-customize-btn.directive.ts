import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowCustomizeBtn]'
})
export class ShowCustomizeBtnDirective implements OnInit{
  btn: HTMLButtonElement;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  
  ngOnInit() {
    this.btn = this.elRef.nativeElement.querySelector('.customize-brand');
  }

  @HostListener('mouseover') onMouseOver() {
    this.renderer.addClass(this.btn, 'show');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.btn, 'show');
  }
}