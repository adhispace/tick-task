import { getAllBoard } from './../../state/board/board.selectors';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { createBoard, init, selectBoard, updateProjectId } from '../../state/board/board.actions';
import { BoardEntity, getDefaultGroupList } from '../../state/board/board.models';

@Component({
  selector: 'tick-task-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit {

  boardList$!: Observable<BoardEntity[]>;
  createBoardForm!: FormGroup;  
  showModal = false;

  private get projectId() {
    return this.route.snapshot.params['id'] ?? null;
  }

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.initCreateBoardForm();
    this.store.dispatch(updateProjectId({projectId: this.projectId}));
    this.store.dispatch(init());
    this.boardList$ = this.store.select(getAllBoard).pipe(map(boards => {
      return boards.filter(board => board.projectId === this.projectId)
    }));
  }

  initCreateBoardForm() {
    this.createBoardForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      desc: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(3)]],
      groupList: [getDefaultGroupList()],
      taskList: [[]],
      projectId: ['', []]
    })
  }

  boardFormSubmit() {
    this.showModal = false;
    this.createBoardForm.patchValue({
      ...this.createBoardForm.value,
      projectId: this.projectId
    });
    this.store.dispatch(createBoard({board: this.createBoardForm.value}));
  }

  getBoardDetail(board: BoardEntity) {
    this.store.dispatch(selectBoard({boardId: board.id}));
    this.router.navigate(['detail'], {relativeTo: this.route});
  }
}
