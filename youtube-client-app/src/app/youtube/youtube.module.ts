import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeRoutingModule } from './pages/youtube-routing.module';
import { SearchItemComponent } from './components/search/search-item/search-item.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SharedModule } from '../shared/shared.module';
import { DetailedInformationPageComponent } from './components/detailed-information-page/detailed-information-page.component';

@NgModule({
  declarations: [
    SearchItemComponent,
    SearchResultsComponent,
    FilterPipe,
    DetailedInformationPageComponent,
  ],
  imports: [CommonModule, YoutubeRoutingModule, SharedModule],
  exports: [SearchItemComponent, SearchResultsComponent],
})
export class YoutubeModule {}
