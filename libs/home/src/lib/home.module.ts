import { RouterModule } from '@angular/router';
import { HeaderModule } from '@tick-task/header';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      }
    ])
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
