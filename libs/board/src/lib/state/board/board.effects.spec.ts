import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as BoardActions from './board.actions';
import { BoardEffects } from './board.effects';

describe('BoardEffects', () => {
  let actions: Observable<Action>;
  let effects: BoardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        BoardEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(BoardEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: BoardActions.init() });

      const expected = hot('-a-|', {
        a: BoardActions.loadBoardSuccess({ board: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
