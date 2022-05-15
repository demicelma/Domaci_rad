import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material angular
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';



const MaterialAngular = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialAngular
  ],
  exports:[MaterialAngular]
})
export class MaterialuiModule { }
