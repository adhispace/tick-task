import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tick-task-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {

  constructor(private router: Router){}

  selectProject() {
    this.router.navigate(['/board']);
  }
}
