import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { SitesComponent } from './pages/sites/sites.component';
import { LoginComponent } from './pages/login/login.component';
import { FormularioComponent } from './components/formulario/formulario.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    component: HomeComponent,
  },
  {
    path: 'contacto',
    component: ContactComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'locales',
    component: SitesComponent,
  },
  {
    path: 'cocina/:idCocina',
    component: LayoutComponent,
  },
  {
    path: 'cocina/:idCocina/:id',
    component: LayoutComponent,
  },
  {
    path: 'formulario',
    component: FormularioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
