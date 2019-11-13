import { NgModule } from '@angular/core';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
@NgModule({
    imports: [ IonicModule, CommonModule ],
    declarations: [ OrderlistComponent ],
    exports: [ OrderlistComponent ]
})
export class ComponentsModule{}