import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './components/project/project.component';
import { HeaderModule } from '@tick-task/header';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProject from './state/project/project.reducer';
import { ProjectEffects } from './state/project/project.effects';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectComponent,
        children: [
          { path: '', component: ProjectListComponent },
          { path: 'list', component: ProjectListComponent }
        ]
      },
    ]),
    StoreModule.forFeature(
      fromProject.PROJECT_FEATURE_KEY,
      fromProject.reducer
    ),
    EffectsModule.forFeature([ProjectEffects]),
    ReactiveFormsModule
  ],
  declarations: [ProjectComponent, ProjectListComponent],
})
export class ProjectModule {}
