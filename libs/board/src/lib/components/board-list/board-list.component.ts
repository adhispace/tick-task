import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardEntity, getDefaultGroupList } from '../../state/board/board.models';
import { createBoard, init, selectBoard } from '../../state/board/board.actions';
import { getAllBoard } from '../../state/board/board.selectors';
import { Observable, tap } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'tick-task-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit {

  boardList$!: Observable<BoardEntity[]>;
  createBoardForm!: FormGroup;  
  showModal = false;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.initCreateBoardForm();
    this.store.dispatch(init());
    this.boardList$ = this.store.select(getAllBoard);
  }

  initCreateBoardForm() {
    this.createBoardForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      desc: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(3)]],
      groupList: [getDefaultGroupList()],
      taskList: [[]]
    })
  }

  boardFormSubmit() {
    this.showModal = false;
    this.store.dispatch(createBoard({board: this.createBoardForm.value}));
  }

  getBoardDetail(board: BoardEntity) {
    this.store.dispatch(selectBoard({boardId: board.id}));
    this.router.navigate(['detail'], {relativeTo: this.route});
  }
}
