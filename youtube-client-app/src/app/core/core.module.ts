import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './pages/core-routing.module';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FilteringBlockComponent } from './components/filtering-block/filtering-block.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    HeaderComponent,
    FilteringBlockComponent,
    NotFoundPageComponent,
  ],
  imports: [CommonModule, CoreRoutingModule, FormsModule, SharedModule],
  exports: [
    FormsModule,
    HeaderComponent,
    FilteringBlockComponent,
    SharedModule,
    NotFoundPageComponent,
  ],
  providers: [AuthGuard],
})
export class CoreModule {}
