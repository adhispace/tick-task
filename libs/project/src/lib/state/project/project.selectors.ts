import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PROJECT_FEATURE_KEY, State, projectAdapter } from './project.reducer';

// Lookup the 'Project' feature state managed by NgRx
export const getProjectState =
  createFeatureSelector<State>(PROJECT_FEATURE_KEY);

const { selectAll, selectEntities } = projectAdapter.getSelectors();

export const getProjectLoaded = createSelector(
  getProjectState,
  (state: State) => state.loaded
);

export const getProjectError = createSelector(
  getProjectState,
  (state: State) => state.error
);

export const getAllProject = createSelector(getProjectState, (state: State) =>
  selectAll(state)
);

export const getProjectEntities = createSelector(
  getProjectState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getProjectState,
  (state: State) => state.selectedId
);

export const getSelectedProject = createSelector(
  getProjectEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
