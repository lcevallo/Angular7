import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../shared/order.service';
import {NgForm} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {OrderItemsComponent} from '../order-items/order-items.component';
import {log} from 'util';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

  constructor(private service: OrderService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form === null)
      form.resetForm();

    this.service.formData = {
        orderId: null,
        orderNo: Math.floor(100000 + Math.random() * 900000).toString(),
        customerId: 0,
        pmethod: '',
        gtotal: 0
      };
    this.service.orderItems = [];
  }

  AddOrEditOrderItem(OrderItemIndex, OrderId) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { OrderItemIndex, OrderId};

    this.dialog.open(OrderItemsComponent, dialogConfig);
  }


  onDeleteOrderItem(orderItemId: number, i: number) {
    this.service.orderItems.splice(i, 1);

  }
}
