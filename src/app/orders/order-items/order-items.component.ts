import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {OrderItem} from '../../shared/order-item.model';
import {ItemService} from '../../shared/item.service';
import {Item} from '../../shared/item.model';
import {OrderService} from '../../shared/order.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: []
})
export class OrderItemsComponent implements OnInit {

  formData: OrderItem;
  itemList: Item[];
  isValid = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private itemService: ItemService,
    private  orderService: OrderService
    ) { }

  ngOnInit() {
    this.itemService.getItemList().then(res => {
                                this.itemList = res.content as Item[];
                                  }
                            );
    if ( this.data.OrderItemIndex === null) {
    this.formData = {
      orderItemId: null,
      orderId: this.data.OrderId,
      itemId: 0,
      quantity: 0,
      ItemName: '',
      Price: 0,
      total: 0 };
   } else {
       this.formData = Object.assign({}, this.orderService.orderItems[this.data.OrderItemIndex]);
   }


  }

  updatePrice(ctrl) {
    if (ctrl.selectedIndex === 0) {
      this.formData.Price = 0;
      this.formData.ItemName = '';
    } else {
      this.formData.Price = this.itemList[ctrl.selectedIndex - 1].price;
      this.formData.ItemName = this.itemList[ctrl.selectedIndex - 1].name;

    }
    this.updateTotal();

  }

  updateTotal() {
    this.formData.total = parseFloat((this.formData.quantity * this.formData.Price).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if(this.data.OrderItemIndex === null)
        this.orderService.orderItems.push(form.value);
      else
          this.orderService.orderItems[this.data.OrderItemIndex] = form.value;
      this.dialogRef.close();
    }

  }

  validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.itemId === 0) {
        this.isValid = false;
    } else if (formData.quantity === 0) {
      this.isValid = false;
 }
    return this.isValid;
  }
}
