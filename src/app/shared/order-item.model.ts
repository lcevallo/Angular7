import {Item} from './item.model';
import {Order} from './order.model';

export class OrderItem {
  orderItemId: number;
  orderId: Order;
  // itemId: number;
  itemId: Item;
  quantity: number;
  // ItemName: string;
  Price: number;
  total: number;
}
