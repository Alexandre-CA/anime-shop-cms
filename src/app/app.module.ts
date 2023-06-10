import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductNewComponent } from './containers/product-new/product-new.component';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsModule } from './icons/icons.module';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryListComponent } from './containers/category-list/category-list.component';
import { CategoryNewComponent } from './containers/category-new/category-new.component';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { ReportsComponent } from './containers/reports/reports.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductNewComponent,
    ProductListComponent,
    ProductItemComponent,
    InputComponent,
    SelectComponent,
    CategoryListComponent,
    CategoryNewComponent,
    CategoryItemComponent,
    LoginComponent,
    RegisterComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    IconsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
