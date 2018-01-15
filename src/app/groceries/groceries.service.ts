import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Product } from "@app/groceries/types/product";


@Injectable()
export class GroceriesService {
  listUrl = environment.apiUrl + '/GroceryLists';
  productUrl = environment.apiUrl + '/Products';

  private _products: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public products: Observable<Product[]> = this._products.asObservable();

  constructor(private http: HttpClient) { }

  // Products

  getProducts() {
    return this.http.get<Product[]>(this.productUrl).subscribe(products => {
      products.sort((a: Product, b: Product) => {
        return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
      })
      this._products.next(products)
    })
  }

  saveProduct(product) {
    return this.http.post<Product>(this.productUrl, product).subscribe(product => {
      let products: Product[] = this._products.getValue();
      products.push(product);
      this.sortProducts(products)
    })
  }

  updateProduct(product) {
    let products: Product[] = this._products.getValue();
    let i = products.indexOf(product);

    return this.http.put<Product>(this.productUrl + `/${product.id}`, product).subscribe(() => {
      products[i] = product;
      this.sortProducts(products)
    })
  }

  deleteProduct(product) {
    let products: Product[] = this._products.getValue();
    let i = products.indexOf(product);

    return this.http.delete<Product>(this.productUrl + `/${product.id}`).subscribe(product => {
      products.splice(i, 1);
      this.sortProducts(products)
    })
  }

  sortProducts(products) {
    // let p = products || this._products.getValue();
    products.sort((a, b) => {
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
    })
    this._products.next(products);
  }
}
