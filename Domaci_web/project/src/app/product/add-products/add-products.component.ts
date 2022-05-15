import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  productForm !: FormGroup;
  actionBtn : string = "Sačuvaj"
  title : string = "Dodavanje proizvoda"
  constructor(private formBuilder : FormBuilder, private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any, 
    private dialogRef : MatDialogRef<AddProductsComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name : ['', Validators.required],
      brand : ['', Validators.required],
      price : ['', Validators.required],
      description: ['', Validators.required],
      image_url: ['', Validators.required]
    });

    //Setovanje vrijednosti putem edita
    if(this.editData){
      this.actionBtn = "Uredi" //Setovanje dugmeta
      this.title = "Uređivanje proizvoda" //Setovanje naslova
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['brand'].setValue(this.editData.brand);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['image_url'].setValue(this.editData.image_url);
      this.productForm.controls['description'].setValue(this.editData.description);
    }

  }

  //Swal Alert
  opensweetalertAdd(){
    Swal.fire({
      title:'Proizvod je uspješno dodat',
      icon:'success',
      showCancelButton:true,
    })
  }
  opensweetalertAddError(){
    Swal.fire({
      title:'Greška prilikom dodavanja proizvoda',
      icon:'error',
      showCancelButton:true,
    })
  }
  opensweetalertEdit(){
    Swal.fire({
      title:'Proizvod je uspješno izmijenjen',
      icon:'success',
      showCancelButton:true,
    })
  }
  opensweetalertEditError(){
    Swal.fire({
      title:'Greška prilikom izmjene proizvoda!',
      icon:'error',
      showCancelButton:true,
    })
  }

  addProduct(){
    //validacija
    if(!this.editData){  
      if(this.productForm.valid){
        //postProduct
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            this.opensweetalertAdd();
            //resetovanje input polja
            this.productForm.reset();
            //Zatvaranje dialoga prilikom izvrsene akcije
            this.dialogRef.close('save');
          },
          error:()=>{
            this.opensweetalertAddError();
          }

        })
      }
    }else{
      this.updateProduct()
    }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        this.opensweetalertEdit();
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        this.opensweetalertEditError();
      }
      
    })
  }

}
