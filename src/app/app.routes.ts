import { Routes } from '@angular/router';
import { ListaPaginadaComponent } from './lista-paginada/lista-paginada.component';
import { DetalleComponent } from './detalle/detalle.component';

export const routes: Routes = [
    {path: 'lista', component: ListaPaginadaComponent},
    {path: 'detalle/:id', component: DetalleComponent},
    {path: '**', redirectTo: 'lista'},

];
