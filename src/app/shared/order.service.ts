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
    return  this.http.post( environment.apiURL + '/order', body);
  }

  getOrderList() {
    return this.http.get(environment.apiURL + '/order').toPromise();
  }
}
