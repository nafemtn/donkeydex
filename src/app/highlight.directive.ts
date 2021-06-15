import { Directive, ElementRef, OnInit, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective implements OnInit {

  @Input() defaultColor = 'transparent';
  @Input('appHighlight') hightlightColor = 'wheat';
  @HostBinding('style.backgroundColor') backgroundColor = 'transparent';

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }
  @HostListener('mouseenter') mouseEnter(event: Event) {
    this.backgroundColor = this.hightlightColor;
  }

  @HostListener('mouseleave') mouseLeave(event: Event) {
    this.backgroundColor = this.defaultColor;
  }
}
