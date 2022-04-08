import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { DetailedInformationPageComponent } from '../components/detailed-information-page/detailed-information-page.component';
import { SearchResultsComponent } from '../components/search/search-results/search-results.component';

const routes: Routes = [
  {
    path: 'videos',
    component: SearchResultsComponent,
  },
  {
    path: 'videos/:id',
    component: DetailedInformationPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubeRoutingModule {}
