import { getSelectedId } from './../../state/board/board.selectors';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as cuid from 'cuid';
import { map, Observable, tap } from 'rxjs';
import { createTask } from '../../state/board/board.actions';
import { getSelected } from '../../state/board/board.selectors';
import { getTaskPriority, Task, TaskGroup } from './../../state/board/board.models';

@Component({
  selector: 'tick-task-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss'],
})
export class BoardDetailComponent implements OnInit {

  taskList$!: Observable<Task[] | any>;
  taskList!: Task[];
  taskGroupList$!: Observable<TaskGroup[] |  undefined>;
  priorities!: string[];
  createTaskForm!: FormGroup;  
  showModal = false;

  constructor(private store: Store, public fb: FormBuilder) {
    this.priorities = getTaskPriority();
  }

  ngOnInit(): void {
      this.initCreateTaskForm();
      this.taskGroupList$ = this.store.select(getSelected).pipe(map(board => board?.groupList))
      this.taskList$ = this.store.select(getSelected)
        .pipe(map((board: any) => board?.taskList), tap((taskList: Task[]) => this.taskList = taskList))
  }

  initCreateTaskForm() {
    this.createTaskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      desc: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(3)]],
      priority: ['High', [Validators.required]],
      group: ['', [Validators.required]]
    })
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  createTask(taskGroup: TaskGroup) {
    this.showModal = true;
    this.createTaskForm.patchValue({
      ...this.createTaskForm.value,
      group: taskGroup.id
    });
  }

  taskFormSubmit() {
    this.showModal = false; 
    const newTask = {
      ...this.createTaskForm.value,
      id: cuid(),
      created: new Date().toDateString(),
      assignee: ''
    }

    this.store.dispatch(createTask({taskList: [...this.taskList, newTask]}));
  }
}
