import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpdateEventPage } from './update-event.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateEventPage
  },
  {
    path: ':id',
    component: UpdateEventPage
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UpdateEventPage]
})
export class UpdateEventPageModule {}
