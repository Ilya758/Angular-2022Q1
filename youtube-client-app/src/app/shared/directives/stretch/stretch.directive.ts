import { Directive, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[appStretch]',
})
export class StretchDirective {
  constructor(private elementRef: ElementRef, private route: ActivatedRoute) {
    this.elementRef = elementRef;
    this.route = route;
    this.stretch();
  }

  stretch() {
    const element = this.elementRef.nativeElement as HTMLUListElement;

    if (this.route.snapshot.params['id']) {
      element.classList.add('list_type_stretch');
    } else {
      element.classList.add('list_type_normal');
    }
  }
}
