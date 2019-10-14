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

  constructor(private htpp: HttpClient) { }

  saveOrUpdate() {

    var body = {
      ...this.formData,
      orderItems : this.orderItems
    };
    console.log(body);

    return  this.htpp.post( environment.apiURL + '/order', body);
  }
}
