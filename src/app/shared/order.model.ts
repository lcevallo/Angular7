import {Customer} from './customer.model';

export class Order {

  orderId: number;
  orderNo: string;
  customer: Customer;
  pmethod: string;
  gtotal: number;

}
