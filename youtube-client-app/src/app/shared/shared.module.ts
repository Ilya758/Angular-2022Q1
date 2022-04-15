import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FlexDirective } from './directives/flex.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GreetingPipe } from './pipes/greeting.pipe';
import { MetricsComponent } from './components/metrics/metrics.component';
import { StretchDirective } from './directives/stretch/stretch.directive';
import { ColorDirective } from './directives/color/color.directive';

@NgModule({
  declarations: [
    FlexDirective,
    GreetingPipe,
    MetricsComponent,
    StretchDirective,
    ColorDirective,
  ],
  imports: [CommonModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FlexDirective,
    GreetingPipe,
    MetricsComponent,
    StretchDirective,
    ColorDirective,
  ],
})
export class SharedModule {}
