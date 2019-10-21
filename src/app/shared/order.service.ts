import { Injectable } from '@angular/core';
import {Order} from './order.model';
import {OrderItem} from './order-item.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order;
  orderItems: OrderItem[];

  constructor(private http: HttpClient) { }

  saveOrUpdate() {

    var body = {
      ...this.formData,
      orderItems : this.orderItems
    };
    if (this.formData.orderId !== null) {
      return  this.http.put( environment.apiURL + '/order/' + this.formData.orderId, body);
    } else {
      return  this.http.post( environment.apiURL + '/order', body);
    }


  }

  getOrderList() {
    return this.http.get(environment.apiURL + '/order').toPromise();
  }

  getOrderbyId(id: number): any {
    return this.http.get(environment.apiURL + '/order/' + id).toPromise();
  }

  getOrderItembyId(id: number): any {
    return this.http.get(environment.apiURL + '/order_item?orderId=' + id).toPromise();
  }

  deleteOrder(id: number) {
    return this.http.delete(environment.apiURL + '/order/' + id).toPromise();
  }
}
