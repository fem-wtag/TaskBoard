import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appUrgentHighlight]',
})
export class UrgentHighlight {
  @Input() appUrgentHighlight = false;

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.appUrgentHighlight) {
      this.el.nativeElement.style.backgroundColor = '#fff5f5';
      this.el.nativeElement.style.boxShadow = '0 4px 12px rgba(229, 62, 62, 0.25)';
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = '';
    this.el.nativeElement.style.boxShadow = '';
  }
}
