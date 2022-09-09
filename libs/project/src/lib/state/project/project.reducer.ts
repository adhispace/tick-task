import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import * as cuid from 'cuid';

import * as ProjectActions from './project.actions';
import { ProjectEntity } from './project.models';

export const PROJECT_FEATURE_KEY = 'project';

export interface State extends EntityState<ProjectEntity> {
  selectedId?: string | number; // which Project record has been selected
  loaded: boolean; // has the Project list been loaded
  error?: string | null; // last known error (if any)
}

export interface ProjectPartialState {
  readonly [PROJECT_FEATURE_KEY]: State;
}

export const projectAdapter: EntityAdapter<ProjectEntity> =
  createEntityAdapter<ProjectEntity>();

export const initialState: State = projectAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const projectReducer = createReducer(
  initialState,
  on(ProjectActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProjectActions.loadProjectSuccess, (state, { project }) =>
    projectAdapter.setAll(project, { ...state, loaded: true })
  ),
  on(ProjectActions.loadProjectFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ProjectActions.selectProject, (state, {projectId}) => ({...state, selectedId: projectId})),
  on(ProjectActions.createProject, (state, {project}) => {
    const newProject: ProjectEntity = {
      id: cuid(),
      name: project.name,
      desc: project.desc
    }
    return projectAdapter.addOne(newProject, {...state, selectedId: newProject.id});
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return projectReducer(state, action);
}
