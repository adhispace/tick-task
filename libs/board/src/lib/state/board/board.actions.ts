import { createAction, props } from '@ngrx/store';
import { BoardEntity, Task } from './board.models';

export const init = createAction('[Board Page] Init');

export const loadBoardSuccess = createAction(
  '[Board/API] Load Board Success',
  props<{ board: BoardEntity[] }>()
);

export const loadBoardFailure = createAction(
  '[Board/API] Load Board Failure',
  props<{ error: any }>()
);

export const getAllBoards = createAction(
  '[Board/API] Get All Boards'
)

export const createBoard = createAction(
  '[Board/API] Create Board',
  props<{ board: BoardEntity }>()
)

export const createTaskGroup = createAction(
  '[Board/API] Create Task Group'
);

export const selectBoard = createAction(
  '[Board/API] Select Board',
  props<{boardId: string}>()
)

export const createTask = createAction(
  '[Board/API] Create task in the board',
  props<{taskList: Task[]}>()
)