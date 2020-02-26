import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserComponent } from './shared/user/user.component';
import { RankingComponent } from './shared/ranking/ranking.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./welcome/welcome.module').then(m => m.WelcomeModule),
    canLoad: [GuestGuard],
    canActivate: [GuestGuard]
  },
  {
    path: 'article',
    loadChildren: () =>
      import('./create/create.module').then(m => m.CreateModule)
  },
  {
    path: 'mylist',
    loadChildren: () =>
      import('./mylist/mylist.module').then(m => m.MylistModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'ranking',
    component: RankingComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'intl',
    loadChildren: () => import('./intl/intl.module').then(m => m.IntlModule)
  },
  {
    path: 'article/:articleId',
    loadChildren: () =>
      import('./article/article.module').then(m => m.ArticleModule)
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then(m => m.SettingsModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: SearchResultComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
