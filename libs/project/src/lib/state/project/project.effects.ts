import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ProjectActions from './project.actions';
import * as ProjectFeature from './project.reducer';

@Injectable()
export class ProjectEffects {
  /* init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ProjectActions.loadProjectSuccess({ project: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ProjectActions.loadProjectFailure({ error });
        },
      })
    )
  ); */

  constructor(private readonly actions$: Actions) {}
}
