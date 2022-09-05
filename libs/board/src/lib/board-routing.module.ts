import { BoardDetailComponent } from './components/board-detail/board-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { BoardListComponent } from './components/board-list/board-list.component';
import { BoardComponent } from './components/board/board.component';

export const routes: Routes = [
    {
        path: '',
        component: BoardComponent,
        children: [
            { path: '', component: BoardListComponent },
            { path: 'list', component: BoardListComponent },
            { path: 'detail', component: BoardDetailComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BoardRoutingModule {

}