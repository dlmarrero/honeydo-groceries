import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { trigger, state, style, transition, animate } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { GroceryList } from "@app/groceries/types/grocList";
import { GroceriesService } from "@app/groceries/groceries.service";
import { Product } from "@app/groceries/types/product";

// TODO:  animate slide effect between edit and shop mode
// TODO:  animate slide out and fill up smoothly for checking off items
// TODO:  toast confirmation messages
// TODO:  material checkboxes
// TODO:  save recipe presets
// TODO:  search bar
// TODO:  show messages when lists are empty

@Component({
  selector: 'app-groc-edit',
  templateUrl: './groc-edit.component.html',
  styleUrls: ['./groc-edit.component.scss'],
  // animations: [
  //   trigger('flyInOut', [
  //     state('in', style({ transform: 'translateX(0)' })),
  //     transition('* => *', [
  //       style({ transform: 'translateX(-100%)' }),
  //       animate(150)
  //     ]),
  //     transition('* => *', [
  //       animate(150, style({ transform: 'translateX(100%)' }))
  //     ])
  //   ])
  // ]
})
export class GrocEditComponent implements OnInit {
  constructor(
    private grocService: GroceriesService,
    private fb: FormBuilder
  ) { }

  products$: Observable<Product[]> = this.grocService.products;

  shopMode: Boolean = false;
  showEdit: Boolean = false;
  editedProduct: Product;

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    aisle: '',
    note: ''
  })

  ngOnInit() {
    this.grocService.getProducts();
  }


  addProduct(): void {
    let form = this.productForm.value;

    let newProduct: Product = {
      name: form.name,
      aisle: form.aisle,
      note: form.note,
      onList: true
    }

    this.grocService.saveProduct(newProduct);

    this.productForm.setValue({
      name: '',
      aisle: '',
      note: ''
    });

  }

  editProduct(product: Product): void {
    this.editedProduct = product;
    this.showEdit = true;

    this.productForm.setValue({
      name: product.name || '',
      aisle: product.aisle || '',
      note: product.note || ''
    })

    window.scrollTo(0, 0);
  }

  toggleList(product: Product): void {
    product.onList = !product.onList;
    this.grocService.updateProduct(product);
  }

  toggleComplete(product: Product): void {
    product.complete = !product.complete;
    this.grocService.updateProduct(product);
  }

  updateProduct() {
    let form = this.productForm.value;

    this.editedProduct.name = form.name || '';
    this.editedProduct.aisle = form.aisle || '';
    this.editedProduct.note = form.note || '';

    this.grocService.updateProduct(this.editedProduct);

    this.productForm.setValue({
      name: '',
      aisle: '',
      note: ''
    });

    this.showEdit = false;

    // Scroll to edited item after DOM has time to update
    setTimeout(() => {
      document.getElementById(this.editedProduct.id.toString()).scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  deleteProduct() {
    this.grocService.deleteProduct(this.editedProduct);

    this.productForm.setValue({
      name: '',
      aisle: '',
      note: ''
    });

    this.showEdit = false;
  }

  toggleMode() {
    this.shopMode = !this.shopMode;
  }
}
