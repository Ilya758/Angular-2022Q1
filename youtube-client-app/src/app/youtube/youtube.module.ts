import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeRoutingModule } from './pages/youtube-routing.module';
import { SearchItemComponent } from './components/search/search-item/search-item.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ColorDirective } from './directives/color.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SearchItemComponent,
    SearchResultsComponent,
    FilterPipe,
    ColorDirective,
  ],
  imports: [CommonModule, YoutubeRoutingModule, SharedModule],
  exports: [SearchItemComponent, SearchResultsComponent],
})
export class YoutubeModule {}
