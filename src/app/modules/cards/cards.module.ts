import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './components/cards/cards.component';
import { CardsListComponent } from './components/cards-list/cards-list.component';


@NgModule({
  declarations: [CardsComponent, CardsListComponent],
  imports: [
    CardsRoutingModule,
    SharedModule
  ]
})
export class CardsModule { }
