import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocinaComponent } from './componente/routs/cocina/cocina.component';
import { HomeComponent } from './componente/routs/home/home.component';
import { InicioComponent } from './componente/routs/inicio/inicio.component';
import { MostradorComponent } from './componente/routs/mostrador/mostrador.component';
import { PrincipalComponent } from './componente/routs/principal/principal.component';
import { UserComponent } from './componente/routs/user/user.component';
import { VentasComponent } from './componente/routs/ventas/ventas.component';
import { HorasComponent } from './componente/routs/horas/horas.component';
import { CalendarComponentComponent } from './componente/routs/calendar-component/calendar-component.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},  
  {path: '', component: InicioComponent},  
  {path: 'principal', component: PrincipalComponent},
  {path: 'cocina', component: CocinaComponent},  
  {path: 'caja', component: MostradorComponent},  
  {path: 'ventas', component: VentasComponent},  
  {path: 'inicio', component: InicioComponent},  
  {path: 'user', component: UserComponent},  
  {path: 'horas', component: HorasComponent},  
  {path: 'calendario', component: CalendarComponentComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
