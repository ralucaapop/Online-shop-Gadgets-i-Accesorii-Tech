import { NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router } from "@angular/router";
import { ListProductsComponent } from "../list-products/list-products.component";

import { ConfigurationsService } from "../services/configurations.service";
import { CustomerService } from "../services/customer.service";
import { BannerComponent } from './banner/banner.component'; // Asumați că banner este în folderul `home/banner`
import { CartButtonComponent } from "./cart-button/cart-button.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    ListProductsComponent,
    CartButtonComponent,
    NgIf,
    BannerComponent  // Adaugă BannerComponent aici
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showProductButtons: boolean = false;
  showProductButtons2: boolean = false;
  showProductButtons3: boolean = false;

  constructor( public appConfig: ConfigurationsService, private router: Router, private customerService: CustomerService) {
  }

  isUserAdmin() {
    return this.customerService.getLoggedUser() != null && this.customerService.getLoggedUser().userRole === "ADMIN";
  }

  onDashboard() {
    this.router.navigate(['/', 'dashboard']);
  }

  onLogOut() {
    this.router.navigate(['/', 'auth']);
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

  showProducts(category: string) {
    this.router.navigate(['/','product-choice']);
  }

}
