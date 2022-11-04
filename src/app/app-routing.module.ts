import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocinaComponent } from './componente/routs/cocina/cocina.component';
import { HomeComponent } from './componente/routs/home/home.component';
import { MostradorComponent } from './componente/routs/mostrador/mostrador.component';
import { PrincipalComponent } from './componente/routs/principal/principal.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},  
  {path: '', component: PrincipalComponent},  
  {path: '', component: PrincipalComponent},  
  {path: 'cocina', component: CocinaComponent},  
  {path: 'caja', component: MostradorComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
