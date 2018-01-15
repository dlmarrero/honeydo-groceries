import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { GroceriesRoutingModule } from './groceries-routing.module';
import { GroceriesService } from './groceries.service';
import { MaterialModule } from "@app/shared";
import { GrocEditComponent } from './groc-edit/groc-edit.component';
import { ListFilter } from "./pipes/list-pipe";

@NgModule({
  imports: [
    CommonModule,
    GroceriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  declarations: [GrocEditComponent, ListFilter],
  providers: [GroceriesService]
})
export class GroceriesModule { }
