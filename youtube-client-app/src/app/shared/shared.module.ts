import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexDirective } from './directives/flex.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GreetingPipe } from './pipes/greeting.pipe';
import { MetricsComponent } from './components/metrics/metrics.component';

@NgModule({
  declarations: [
    FlexDirective,
    GreetingPipe,
    MetricsComponent,
  ],
  imports: [CommonModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    FlexDirective,
    GreetingPipe,
    MetricsComponent,
  ],
})
export class SharedModule {}
