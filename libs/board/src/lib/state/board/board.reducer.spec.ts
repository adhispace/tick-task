import { Action } from '@ngrx/store';

import * as BoardActions from './board.actions';
import { BoardEntity } from './board.models';
import { State, initialState, reducer } from './board.reducer';

describe('Board Reducer', () => {
  const createBoardEntity = (id: string, name = ''): BoardEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Board actions', () => {
    it('loadBoardSuccess should return the list of known Board', () => {
      const board = [
        createBoardEntity('PRODUCT-AAA'),
        createBoardEntity('PRODUCT-zzz'),
      ];
      const action = BoardActions.loadBoardSuccess({ board });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
