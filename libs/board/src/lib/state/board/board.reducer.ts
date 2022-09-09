import { getSelectedId } from './board.selectors';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as cuid from 'cuid';
import * as BoardActions from './board.actions';
import { BoardEntity } from './board.models';

export const BOARD_FEATURE_KEY = 'board';

export interface State extends EntityState<BoardEntity> {
  selectedId: string; 
  loaded: boolean;
  error?: string | null;
}

export interface BoardPartialState {
  readonly [BOARD_FEATURE_KEY]: State;
}

export const boardAdapter: EntityAdapter<BoardEntity> =
  createEntityAdapter<BoardEntity>();

export const initialState: State = boardAdapter.getInitialState({
  selectedId: '',
  loaded: false
});

const boardReducer = createReducer(
  initialState,
  on(BoardActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(BoardActions.loadBoardSuccess, (state, { board }) =>
    boardAdapter.setAll(board, { ...state, loaded: true })
  ),
  on(BoardActions.loadBoardFailure, (state, { error }) => ({ ...state, error })),
  on(BoardActions.selectBoard, (state, {boardId}) => ({...state, selectedId: boardId})),
  on(BoardActions.createBoard, (state, {board}) => {
    const newBoard: BoardEntity = {
      id: cuid(),
      name: board.name,
      desc: board.desc,
      groupList: board.groupList,
      taskList: board.taskList,
      projectId: board.projectId
    }
    return boardAdapter.addOne(newBoard, {...state, selectedId: newBoard.id});
  }),
  on(BoardActions.createTask, (state, {newTask}) => {
    const currBoard: any = state.entities[state.selectedId];
    return boardAdapter.updateOne({id: state.selectedId, changes: {
      ...currBoard,
      taskList: [...currBoard.taskList, newTask]
    }}, state)
  })
);

export function reducer(state: State, action: Action) {
  return boardReducer(state, action);
}
