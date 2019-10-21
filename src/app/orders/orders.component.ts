import { Component, OnInit } from '@angular/core';
import {OrderService} from '../shared/order.service';
import {Order} from '../shared/order.model';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
  orderList: Order[];
  constructor(
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.orderService.getOrderList().then(res => this.orderList = res['content'] as Order[]);
  }

  openForEdit(orderId: number) {
   this.router.navigate(['/order/edit/' + orderId]);
  }

  onOrderDelete(orderId: number) {
    if (confirm('Are you sure to delete this record')) {
      this.orderService.deleteOrder(orderId).then( res => { this.refreshList();
                                                            this.toastr.warning('Deleted Successfully', 'Restaurant App');
      } );
    }

  }
}
