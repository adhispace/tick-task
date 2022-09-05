import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs';

import * as BoardActions from './board.actions';

@Injectable()
export class BoardEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.init),
      map(action => BoardActions.loadBoardSuccess({ board: [] }))
      /* fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return BoardActions.loadBoardSuccess({ board: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return BoardActions.loadBoardFailure({ error });
        },
      }
      ) */
    )
  );

  constructor(private readonly actions$: Actions) {}
}
