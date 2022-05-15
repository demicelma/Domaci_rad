import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddProductsComponent } from '../product/add-products/add-products.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  title =' ovo je naslov neki';
  
  constructor(private dialog : MatDialog) {
    
  }

  openDialog() {
    this.dialog.open(AddProductsComponent, {
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        
      }
    })
  }

  ngOnInit(): void {
  }

}