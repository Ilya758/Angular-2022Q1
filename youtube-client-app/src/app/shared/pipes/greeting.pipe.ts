import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'greeting',
})
export class GreetingPipe implements PipeTransform {
  transform(value: string): string | null {
    return value ? `Welcome, ${value}!` : null;
  }
}
