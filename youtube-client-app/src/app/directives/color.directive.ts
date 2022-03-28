import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appColor]',
})
export class ColorDirective implements OnInit {
  @Input() date!: string;
  el!: ElementRef;

  constructor(el: ElementRef) {
    this.el = el;
  }

  private changeColor() {
    let date = this.retrieveDate(this.date);
    const [days, daysInMonth, daysInHalfYear] = [7, 31, 182];
    let color: string;

    if (date > daysInHalfYear) {
      color = 'red';
    } else if (date < daysInHalfYear && date > daysInMonth) {
      color = 'yellow';
    } else if (date < daysInMonth && date > days) {
      color = 'green';
    } else {
      color = 'blue';
    }

    (this.el.nativeElement as HTMLDivElement).classList.add(
      `underline_color_${color}`
    );
  }

  private retrieveDate(date: string) {
    const publishDate = Date.parse(date);
    const now = Date.now();
    return (now - publishDate) / (1000 * 3600 * 24);
  }

  ngOnInit(): void {
    this.changeColor();
  }
}
