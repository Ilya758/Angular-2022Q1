import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFlex]',
})
export class FlexDirective {
  constructor(private elementRef: ElementRef) {
    this.setFlex();
  }

  setFlex = () => {
    const element = this.elementRef.nativeElement as HTMLElement;

    const matches = window.location.pathname.match(
      /\/(login|videos)?/i
    ) as RegExpMatchArray;

    matches || matches[0] === '/'
      ? element.classList.remove('main_align_center')
      : element.classList.add('main_align_center');
  };
}
