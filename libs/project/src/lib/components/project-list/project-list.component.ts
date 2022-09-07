import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createProject, init, selectProject } from '../../state/project/project.actions';
import { ProjectEntity } from '../../state/project/project.models';
import { getAllProject } from '../../state/project/project.selectors';

@Component({
  selector: 'tick-task-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  projectList$!: Observable<ProjectEntity[]>;
  createProjectForm!: FormGroup;  
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
    this.projectList$ = this.store.select(getAllProject);
  }

  initCreateBoardForm() {
    this.createProjectForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      desc: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(3)]],
      boardList: [[]]
    })
  }

  projectFormSubmit() {
    this.showModal = false;
    this.store.dispatch(createProject({project: this.createProjectForm.value}));
  }

  getProjectDetail(project: ProjectEntity) {
    this.store.dispatch(selectProject({projectId: project.id}));
    this.router.navigateByUrl('/board');
  }
}
