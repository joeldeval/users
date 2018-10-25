import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HomePage } from './home';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../filters/filter.pipe';

@NgModule({
  declarations: [
    HomePage,
    FilterPipe
  ],
  imports: [
    FormsModule,
    IonicModule
  ],
})
export class HomePageModule {}
