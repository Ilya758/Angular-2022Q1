import { Directive, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appFlex]',
})
export class FlexDirective {
  constructor(private elementRef: ElementRef, private router: Router) {
    this.setFlex();
  }

  setFlex = () => {
    const element = this.elementRef.nativeElement as HTMLElement;

    setTimeout(() => {
      this.router.url === '/404'
        ? element.classList.add('main_align_center')
        : element.classList.remove('main_align_center');
    });
  };
}
