import { Component } from '@angular/core';
import {AddEditCustomerComponent} from "../add-edit-customer/add-edit-customer.component";
import {AddEditProductComponent} from "../add-edit-product/add-edit-product.component";
import {ListCustomersComponent} from "../list-customers/list-customers.component";
import {ListOrdersComponent} from "../list-orders/list-orders.component";
import {ListProductsComponent} from "../../list-products/list-products.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ConfigurationsService} from "../../services/configurations.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rooms-manager',
  standalone: true,
    imports: [
        AddEditCustomerComponent,
        AddEditProductComponent,
        ListCustomersComponent,
        ListOrdersComponent,
        ListProductsComponent,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule
    ],
  templateUrl: './products-manager.component.html',
  styleUrl: './products-manager.component.css'
})
export class ProductsManagerComponent {
  productData: any;

  constructor(public appConfig: ConfigurationsService,  private router: Router) {

  }

  onChangeRoom(room: any) {
    this.productData = room;
  }

  onHome() {
    this.router.navigate(['/', 'home']);
  }

  onDashboard() {
    this.router.navigate(['/', 'dashboard']);
  }

  onLogOut() {
    this.router.navigate(['/', 'auth']);
  }
}
