import {Item} from './item.model';

export class OrderItem {
  orderItemId: number;
  orderId: number;
  // itemId: number;
  itemId: Item;
  quantity: number;
  // ItemName: string;
  Price: number;
  total: number;
}
