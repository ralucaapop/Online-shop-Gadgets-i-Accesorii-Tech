import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {NgForOf, NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {OrderService} from "../../services/order.service";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-cart-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    NgForOf,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.css'
})
export class CartDialogComponent {
  products: Array<any> = [];
  details: FormControl = new FormControl<any>('', Validators.required);

  constructor(private orderService: OrderService) {
    this.orderService.getCart().subscribe((productsList: Array<any>) => {
      this.products = productsList;
      this.loadCartItems();
    });
  }

  public onBuy() {
    this.orderService.createOrder(this.details.getRawValue()!);
    localStorage.setItem('cartItems', JSON.stringify(this.products));
  }

  public onDeleteFromCart(product: any) {
    this.products = this.products.filter(cartItem => cartItem.id !== product.id);
    localStorage.setItem('cartItems', JSON.stringify(this.products));
    this.orderService.removeFromCart(product);
  }

  getErrorMessage(input: FormControl): string {
    if (input.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }
  private loadCartItems() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.products = JSON.parse(savedCartItems);
    }
  }
}
