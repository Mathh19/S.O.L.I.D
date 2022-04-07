import { OrderStatus } from './interfaces/order-status';
import { Persistency } from '../services/persistency';
import { Messaging } from '../services/service-messaging';
import { ShoppingCart } from './shopping-cart';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistency: Persistency,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log(`Seu carrinho está vazio`);
      return;
    }

    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `Seu pedido com total de ${this.cart.total()} foi recebido.`,
    );
    this.persistency.saveOrder();
    this.cart.clear();
  }
}
