import { ProjectEntity } from './project.models';
import {
  projectAdapter,
  ProjectPartialState,
  initialState,
} from './project.reducer';
import * as ProjectSelectors from './project.selectors';

describe('Project Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getProjectId = (it: ProjectEntity) => it.id;
  const createProjectEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ProjectEntity);

  let state: ProjectPartialState;

  beforeEach(() => {
    state = {
      project: projectAdapter.setAll(
        [
          createProjectEntity('PRODUCT-AAA'),
          createProjectEntity('PRODUCT-BBB'),
          createProjectEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Project Selectors', () => {
    it('getAllProject() should return the list of Project', () => {
      const results = ProjectSelectors.getAllProject(state);
      const selId = getProjectId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedProject() should return the selected Entity', () => {
      const result = ProjectSelectors.getSelectedProject(state) as ProjectEntity;
      const selId = getProjectId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getProjectLoaded() should return the current "loaded" status', () => {
      const result = ProjectSelectors.getProjectLoaded(state);

      expect(result).toBe(true);
    });

    it('getProjectError() should return the current "error" state', () => {
      const result = ProjectSelectors.getProjectError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
