import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListProductsComponent } from './product/list-products/list-products.component';

const routes: Routes = [
  {path:'', component: NavbarComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'products', component: ListProductsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
