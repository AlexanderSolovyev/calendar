import { NgModule } from '@angular/core';
import { PreloadAllModules,Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'add-event', loadChildren: './add-event/add-event.module#AddEventPageModule' },
  { path: 'update-event', loadChildren: './update-event/update-event.module#UpdateEventPageModule' },
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
