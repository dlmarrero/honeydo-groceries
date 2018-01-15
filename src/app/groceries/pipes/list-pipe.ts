import { Pipe, PipeTransform } from '@angular/core';
import { Product } from "@app/groceries/types/product";

@Pipe({
    name: 'listFilter',
    pure: false
})
export class ListFilter implements PipeTransform {
    transform(items: Product[]): any {
        if (!items) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        items = items.filter((item: Product) => item.onList);
        return items.sort((a, b) => {
            return a.aisle.localeCompare(b.aisle, undefined, { numeric: true, sensitivity: 'base' })
        })
    }
}