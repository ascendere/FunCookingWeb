import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MSALInstanceFactory, environment } from '../environments/environment';
import { InteractionType } from '@azure/msal-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './components/card/card.component';
import { PagesComponent } from './pages/pages.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SitesComponent } from './pages/sites/sites.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormularioComponent } from './components/formulario/formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlidesComponent } from './components/slides/slides.component';

import { CarouselConfig, CarouselModule } from 'ngx-bootstrap/carousel';
import { CardHomeComponent } from './components/card-home/card-home.component';
import {
  MSAL_INSTANCE,
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalModule,
  MsalRedirectComponent,
  MsalService,
} from '@azure/msal-angular';
import { ProductComponent } from './admin/product/product.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { RecipeComponent } from './admin/recipe/recipe.component';
import { RecipesListComponent } from './admin/recipes-list/recipes-list.component';
import { ProductsListComponent } from './admin/products-list/products-list.component';

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    PagesComponent,
    LayoutComponent,
    HomeComponent,
    ContactComponent,
    SitesComponent,
    LoginComponent,
    FormularioComponent,
    SlidesComponent,
    CardHomeComponent,
    ProductComponent,
    RecipeComponent,
    RecipesListComponent,
    ProductsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    MsalModule,
  ],
  providers: [
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: CarouselConfig,
      useValue: {
        interval: 5000 /* 5seg  next slide */,
        noPause: true,
        showindicators: true,
      },
    },
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
