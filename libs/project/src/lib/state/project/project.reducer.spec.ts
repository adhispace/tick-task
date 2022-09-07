import { Action } from '@ngrx/store';

import * as ProjectActions from './project.actions';
import { ProjectEntity } from './project.models';
import { State, initialState, reducer } from './project.reducer';

describe('Project Reducer', () => {
  const createProjectEntity = (id: string, name = ''): ProjectEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Project actions', () => {
    it('loadProjectSuccess should return the list of known Project', () => {
      const project = [
        createProjectEntity('PRODUCT-AAA'),
        createProjectEntity('PRODUCT-zzz'),
      ];
      const action = ProjectActions.loadProjectSuccess({ project });

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
