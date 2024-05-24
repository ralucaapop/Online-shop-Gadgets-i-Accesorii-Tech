import {Component, EventEmitter, input, Output} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {ActivatedRoute, Router} from "@angular/router";
import {CartButtonComponent} from './cart-button/cart-button.component';
import {CustomerService} from "../services/customer.service";
import {NgIf} from "@angular/common";
import {ConfigurationsService} from "../services/configurations.service";
import {MatNestedTreeNode, MatTree} from "@angular/material/tree";
import { ProductService } from "../services/product.service";
import {ListProductsChoiceComponent} from "../list-products-choice/list-products-choice.component";
import {ListProductsComponent} from "../list-products/list-products.component";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    CartButtonComponent,
    NgIf,
    MatNestedTreeNode,
    MatTree,
    ListProductsChoiceComponent,
    ListProductsComponent,

  ],
  templateUrl: './product-choice.component.html',
  styleUrl: './product-choice.component.css'
})
export class ProductChoiceComponentComponent {

  public showProductButtons: boolean=false;
  public showProductButtons2: boolean=false;
  public showProductButtons3: boolean=false;
  private listProductsComponent: ListProductsChoiceComponent;

  constructor(private listProductsChoiceComponent: ListProductsChoiceComponent,private route: ActivatedRoute, public appConfig: ConfigurationsService, private router:Router , private orderService: OrderService,private customerService:CustomerService,private productService: ProductService){
    this.listProductsComponent = listProductsChoiceComponent;
  }
  isUserAdmin(){
    if(this.customerService.getLoggedUser() != null && this.customerService.getLoggedUser().userRole == "ADMIN"){
      return true;
    }
    return false;

  }

  public gohome(){
      this.router.navigate(['/','home']);
  }
  onLogOut(){
    this.router.navigate(['/','auth']);
  }

  public toggleProductButtons() {
    this.showProductButtons = !this.showProductButtons;
  }

  toggleProductButtons2() {
    this.showProductButtons2 = !this.showProductButtons2;

  }

  toggleProductButtons3() {
    this.showProductButtons3 = !this.showProductButtons3;

  }

  showProducts(category : string) {
    this.listProductsComponent.filterProductsByCategory(category);
  }
}
