import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ProjectActions from './project.actions';
import { ProjectEffects } from './project.effects';

describe('ProjectEffects', () => {
  let actions: Observable<Action>;
  let effects: ProjectEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ProjectEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ProjectEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ProjectActions.init() });

      const expected = hot('-a-|', {
        a: ProjectActions.loadProjectSuccess({ project: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
