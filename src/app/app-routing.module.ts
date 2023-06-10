import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductNewComponent } from './containers/product-new/product-new.component';
import { CategoryListComponent } from './containers/category-list/category-list.component';
import { CategoryNewComponent } from './containers/category-new/category-new.component';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { ReportsComponent } from './containers/reports/reports.component';
const routes: Routes = [
  {
    path:'',
    redirectTo:'product',
    pathMatch:'full'
  },
  {
    path:'product',
    canActivate:[AuthGuard],
    component: ProductListComponent
  },
  {
    path:'product/new',
    canActivate:[AuthGuard],
    component: ProductNewComponent
  },
  {
    path:'product/edit/:id',
    canActivate:[AuthGuard],
    component: ProductNewComponent
  },
  {
    path:'category',
    canActivate:[AuthGuard],
    component: CategoryListComponent
  },
  {
    path:'category/new',
    canActivate:[AuthGuard],
    component: CategoryNewComponent
  },
  {
    path:'category/edit/:id',
    canActivate:[AuthGuard],
    component: CategoryNewComponent
  },
  {
    path:'reports',
    canActivate:[AuthGuard],
    component: ReportsComponent
  },
  {
    path:'auth/login',
    component: LoginComponent
  },
  {
    path:'auth/register',
    component: RegisterComponent
  },
  {
    path:'**',
    redirectTo:'product',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
