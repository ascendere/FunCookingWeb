import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { SitesComponent } from './pages/sites/sites.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    component: HomeComponent,
     canActivate: [AuthGuard],
  },
  {
    path: 'contacto',
    component: ContactComponent,
     canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'locales',
    component: SitesComponent,
     canActivate: [AuthGuard],
  },
  {
    path: 'formulario',
    component: FormularioComponent,
     canActivate: [AuthGuard],
  },
  {
    path: 'cocina/:idCocina',
    component: LayoutComponent,
     canActivate: [AuthGuard],
  },
  {
    path: 'cocina/:idCocina/:id',
    component: LayoutComponent,
     canActivate: [AuthGuard],
  },
  {
    path: 'products',
    component: ProductsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-producto',
    component: ProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-producto/:id',
    component: ProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'recipes',
    component: RecipesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-recipe',
    component: RecipeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-recipe/:id',
    component: RecipeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
