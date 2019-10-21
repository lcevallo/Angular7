import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../shared/order.service';
import {NgForm} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {OrderItemsComponent} from '../order-items/order-items.component';
import {CustomerService} from '../../shared/customer.service';
import {Customer} from '../../shared/customer.model';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

  customerList: Customer[];
  isValid = true;

  constructor(private service: OrderService,
              private dialog: MatDialog,
              private customerService: CustomerService,
              private toastr: ToastrService,
              private router: Router,
              private currentRoute: ActivatedRoute
              ) { }

  ngOnInit() {
    let orderID = this.currentRoute.snapshot.paramMap.get('id');

    if (orderID === null) {
      this.resetForm();
    } else {

      this.service.getOrderItembyId( parseInt (orderID)).then(res => {

        let orderObject1 = JSON.parse( JSON.stringify( res['content'] ) );
        this.service.orderItems = orderObject1;
      });

      this.service.getOrderbyId( parseInt (orderID)).then(res => {
          let orderObject = JSON.parse( JSON.stringify( res ) );
          this.service.formData = orderObject;
        });

    }


    this.customerService.getCustomerList().then(res => {
        this.customerList = res['content'] as Customer[];
    });
  }

  resetForm(form?: NgForm) {
    if (form === null)
      form.resetForm();

    this.service.formData = {
        orderId: null,
        orderNo: Math.floor(100000 + Math.random() * 900000).toString(),
        // customer.customerId: 0,
        customer: new Customer(),
        pmethod: '',
        gtotal: 0,
        deletedOrderItemIds: ''
      };
    this.service.orderItems = [];
  }

  AddOrEditOrderItem(OrderItemIndex, OrderId) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { OrderItemIndex, OrderId};

    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    });
  }


  onDeleteOrderItem(orderItemId: number, i: number) {

    if (orderItemId != null) {
       if ( this.service.formData.deletedOrderItemIds == null) {
          this.service.formData.deletedOrderItemIds = '';
       }
      this.service.formData.deletedOrderItemIds += orderItemId == null ? '' : orderItemId + ',';
      console.log(this.service.formData.deletedOrderItemIds );
    }

    this.service.orderItems.splice(i, 1);
    this.updateGrandTotal();

  }

  updateGrandTotal() {
    this.service.formData.gtotal = this.service.orderItems.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0);
    this.service.formData.gtotal = parseFloat(this.service.formData.gtotal.toFixed(2));
  }

  validateForm() {
    this.isValid = true;

    if (this.service.formData.customer.customerId === 0) {
      this.isValid = false;
    }
    else if (this.service.orderItems.length === 0)
      this.isValid = false;
    return this.isValid;
  }

  onSubmit(form: NgForm) {
      if (this.validateForm()) {
            this.service.saveOrUpdate().subscribe(res => {
                                   this.resetForm();
                                   this.toastr.success('Guardado Exitoso', 'Restaurant App');
                                   this.router.navigate(['/orders']);
                                                      }
            );
      }
  }
}
