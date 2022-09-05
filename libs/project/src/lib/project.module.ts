import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { HeaderModule } from '@tick-task/header';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectComponent,
        pathMatch: 'full'
      }
    ])
  ],
  declarations: [ProjectComponent],
})
export class ProjectModule {}
