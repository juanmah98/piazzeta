import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocinaComponent } from './componente/routs/cocina/cocina.component';
import { HomeComponent } from './componente/routs/home/home.component';
import { MostradorComponent } from './componente/routs/mostrador/mostrador.component';
import { PrincipalComponent } from './componente/routs/principal/principal.component';
import { VentasComponent } from './componente/routs/ventas/ventas.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},  
  {path: '', component: PrincipalComponent},  
  {path: 'cocina', component: CocinaComponent},  
  {path: 'caja', component: MostradorComponent},  
  {path: 'ventas', component: VentasComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
