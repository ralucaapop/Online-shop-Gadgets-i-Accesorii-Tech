import { NgForOf, NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormField } from "@angular/material/form-field";
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from "../../services/customer.service";
@Component({
  selector: 'app-list-customers',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgForOf,
    NgIf,
    MatFormField
  ],
  templateUrl: './list-customers.component.html',
  styleUrl: './list-customers.component.css'
})
export class ListCustomersComponent {
  dataSource: MatTableDataSource<CustomerService> = new MatTableDataSource<CustomerService>();
  @Output() changeCustomerData: EventEmitter<any> = new EventEmitter<any>();

  customers: Array<any> = [];

  constructor(private customerService: CustomerService) {
    this.customerService.getCustomerList().subscribe((customerList: Array<any>) => {
      
      this.customers = customerList;
    })
  }

  onEdit(customer: any) {
    this.changeCustomerData.emit(customer);
  }

  onDelete(customer: any) {
    this.customerService.deleteCustomer(customer)
  }
  
  filterChange(event: Event) {
    
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
