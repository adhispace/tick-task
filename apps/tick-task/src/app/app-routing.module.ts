import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('@tick-task/home').then(m => m.HomeModule),
    },
    {
        path: 'project',
        loadChildren: () => import('@tick-task/project').then(m => m.ProjectModule),
    },
    {
        path: 'board',
        loadChildren: () => import('@tick-task/board').then(m => m.BoardModule),
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}