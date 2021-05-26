import { Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { ImportacaoComponent } from './importacao/importacao.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: '/formulario', pathMatch: 'full' },
  { path: 'formulario', component: FormularioComponent },
  { path: 'importacao', component: ImportacaoComponent },
];
