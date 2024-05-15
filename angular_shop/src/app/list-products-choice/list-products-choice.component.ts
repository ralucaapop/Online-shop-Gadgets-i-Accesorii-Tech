import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductService} from "../services/product.service";
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {OrderService} from "../services/order.service";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";
import {ProductChoiceComponentComponent} from "../product/product-choice.component";
//import {showProducts} from "../product/product-choice.component";

@Component({
  selector: 'app-list-products-choice',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf,
    MatButtonModule,
    NgIf,
    TitleCasePipe,
    ProductChoiceComponentComponent
  ],
  templateUrl: './list-products-choice.component.html',
  styleUrl: './list-products-choice.component.css'
})
export class ListProductsChoiceComponent {
  @Output() changeData = new EventEmitter<any>();
  products: Array<any> = [];
  filteredProducts: Array<any> = [];


  constructor(private productService: ProductService, private orderService: OrderService, private customerService: CustomerService, private router: Router) {
    this.productService.getProductList().subscribe((productList: Array<any>) => {
      this.products = productList;
      this.filteredProducts = productList;
    })

  }
  filterProductsByCategory(category: string): void {
    this.filteredProducts = this.products.filter(product => product.category === category);
  }
  onBuy(item: any) {
    /*if (this.customerService.getLoggedUser() == null) {
      alert("Utilizatorul nu este logat, trebuie sa te loghezi inainte sa adaugi produse in cos");
      this.router.navigate(["/", "auth"]);
    } else {
      this.router.navigate(['/', 'product-details', item.id]);
    }
*/

    this.orderService.addToCart(item);
  }
}
