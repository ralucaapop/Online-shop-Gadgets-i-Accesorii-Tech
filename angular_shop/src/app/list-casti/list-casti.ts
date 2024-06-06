import { NgForOf, NgIf, TitleCasePipe } from "@angular/common";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { Router } from "@angular/router";
import { CustomerService } from "../services/customer.service";
import { OrderService } from "../services/order.service";
import { ProductService } from "../services/product.service";

@Component({
  selector: 'app-list-casti',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf,
    MatButtonModule,
    NgIf,
    TitleCasePipe
  ],
  templateUrl: './list-casti.html',
  styleUrl: './list-casti.css'
})
export class ListProductsComponent {
  @Output() changeData = new EventEmitter<any>();// EventEmitter ne ajuta sa transmitem obiecte inafara componentei
  @Input("isAdmin") isAdmin: boolean = false;
  products: Array<any> = [];

  constructor(private productService: ProductService, private orderService: OrderService, private customerService: CustomerService, private router: Router) {
    this.productService.getProductList().subscribe((productList: Array<any>) => {
      this.products = productList.filter(product => product.productType == 'Casti');
    })

  }

  onEdit(item: any) {
    this.changeData.emit(item);
  }

  onDelete(item: any) {
    console.log(item);
    this.productService.deleteProduct(item);
  }

  onBuy(item: any) {
    if (this.customerService.getLoggedUser() == null) {
      alert("Utilizatorul nu este logat, trebuie sa te loghezi inainte sa adaugi produse in cos");
      this.router.navigate(["/", "auth"]);
    } else {
      this.router.navigate(['/', 'product-details', item.id]);
    }
    this.orderService.addToCart(item);
  }
}
