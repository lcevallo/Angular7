import {Customer} from './customer.model';
import {Item} from './item.model';

export class Order {

  orderId: number;
  orderNo: string;
  customer: Customer;
  pmethod: string;
  gtotal: number;
  orderItems?: Item[];
  deletedOrderItemIds: string = '';

}
