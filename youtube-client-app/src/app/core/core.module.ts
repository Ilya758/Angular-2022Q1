import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './pages/core-routing.module';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FilteringBlockComponent } from './components/filtering-block/filtering-block.component';

@NgModule({
  declarations: [HeaderComponent, FilteringBlockComponent],
  imports: [CommonModule, CoreRoutingModule, FormsModule, SharedModule],
  exports: [
    FormsModule,
    HeaderComponent,
    FilteringBlockComponent,
    SharedModule,
  ],
})
export class CoreModule {}
