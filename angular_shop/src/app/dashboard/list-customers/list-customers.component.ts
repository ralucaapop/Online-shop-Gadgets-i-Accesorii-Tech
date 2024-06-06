import {Component, EventEmitter, Output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerService} from "../../services/customer.service";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-list-customers',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgForOf,
    NgIf,
    FormsModule,
    MatLabel,
    MatFormField,
    MatInput
  ],
  templateUrl: './list-customers.component.html',
  styleUrl: './list-customers.component.css'
})
export class ListCustomersComponent  {
  @Output() changeCustomerData: EventEmitter<any> = new EventEmitter<any>();


  customers: Array<any> = [];
  filteredCustomers: Array<any> = [];
  constructor(private customerService: CustomerService) {
    this.customerService.getCustomerList().subscribe((customerList: Array<any>) => {
      this.customers = customerList;
      this.filteredCustomers = customerList;

    })
  }

  onEdit(customer: any) {
    this.changeCustomerData.emit(customer);
  }

  onDelete(customer: any) {
    this.customerService.deleteCustomer(customer)
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (!searchTerm) {
      this.filteredCustomers = this.customers;
    } else {
      this.filteredCustomers = this.customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

}
