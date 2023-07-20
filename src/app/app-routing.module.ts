import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { SitesComponent } from './pages/sites/sites.component';
import { LoginComponent } from './pages/login/login.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ProductComponent } from './admin/product/product.component';
import { RecipeComponent } from './admin/recipe/recipe.component';
import { ProductsListComponent } from './admin/products-list/products-list.component';
import { RecipesListComponent } from './admin/recipes-list/recipes-list.component';
import { AuthGuard } from './guards/auth.guard';

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
  /* {
    path: 'cocinas',
    component: LayoutComponent,
  }, */
  {
    path: 'cocina/:idCocina',
    component: LayoutComponent,
  },
  {
    path: 'cocina/:idCocina/:id',
    component: LayoutComponent,
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
