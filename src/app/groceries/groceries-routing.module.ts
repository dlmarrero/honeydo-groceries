import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrocEditComponent } from "./groc-edit/groc-edit.component";

const routes: Routes = [
  { path: '', component: GrocEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroceriesRoutingModule { }
