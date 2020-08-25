import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/cards', pathMatch: 'full' },
  {
    path: 'cards',
    loadChildren: () => import('./modules/cards/cards.module').then(m => m.CardsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
