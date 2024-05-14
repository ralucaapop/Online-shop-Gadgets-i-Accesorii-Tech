import { Component } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { Router } from "@angular/router";
import { ListProductsComponent } from "../list-products/list-products.component";
import { CartButtonComponent } from "./cart-button/cart-button.component";
import { CustomerService } from "../services/customer.service";
import { NgIf } from "@angular/common";
import { ConfigurationsService } from "../services/configurations.service";
import { SlidesComponent } from '../home/slides/slides.component';  // Ensure this line is corrected

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
    SlidesComponent  // Now correctly added
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    public appConfig: ConfigurationsService, 
    private router: Router, 
    private customerService: CustomerService
  ) {}

  isUserAdmin() {
    return this.customerService.getLoggedUser() != null && this.customerService.getLoggedUser().userRole === "ADMIN";
  }

  onDashboard() {
    this.router.navigate(['/','dashboard']);
  }

  onLogOut() {
    this.router.navigate(['/','auth']);
  }
}
