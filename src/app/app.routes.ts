import { Routes } from '@angular/router';
import { LoaderComponent } from './views/loader/loader.component';
import { DashComponent } from './views/dash/dash.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { AddComponent } from './views/splits/add/add.component';
import { UseComponent } from './views/splits/use/use.component';
import { EditComponent } from './views/splits/edit/edit.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'loader',
        pathMatch: 'full'
    },
    {
        path: 'loader',
        component: LoaderComponent,
    },
    {
        path: 'dashboard',
        component: DashComponent,
    }, {
        path: "split",
        children: [{
            path: 'add',
            component: AddComponent
        }, {
            path: "edit/:id",
            component: EditComponent,
        }, {
            path: "use/:id/:exercise",
            component: UseComponent
        }]
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];
