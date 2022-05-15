import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AddProductsComponent } from '../add-products/add-products.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'brand', 'price', 'description', 'image_url','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllProducts();
  }


  openDialog() {
    this.dialog.open(AddProductsComponent, {
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllProducts();  
      }
    })
  }
  //Prikazivanje
  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        //paginacija
        this.dataSource.paginator = this.paginator
        //sortiranje
        this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert('Error while fetching the Records!')
      }
    })
  }

  //Editovanje
  editProduct(row: any){
    this.dialog.open(AddProductsComponent,{
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllProducts();
      }
    })
    
  }
//SweetAlert
  opensweetalertDelete(){
    Swal.fire({
      title:'Proizvod je obrisan uspješno',
      icon:'success',
      showCancelButton:true,
    })
  }
  opensweetalertDeleteError(){
    Swal.fire({
      title:'Greška prilikom brisanja proizvoda',
      icon:'error',
      showCancelButton:true,
    })
  }

  //Delete
  deleteProduct(id:number){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res) =>{
        this.opensweetalertDelete();
        this.getAllProducts();
      },
      error:()=>{
        this.opensweetalertDeleteError();
      }
    })
  }


   //filteri
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
