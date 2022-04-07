/*
Liskov substitution principle (Princípio da substituição de Liskov) -
Se ϕ(x) é uma propriedade demonstrável dos objetos x de tipo T. Então ϕ(y)
deve ser verdadeiro para objetos y de tipo S onde S é um subtipo de T.

Mais simples: Subtipos precisam ser substituíveis por seus tipos de base.
Mais simples ainda: Se meu programa espera um Animal, algo do tipo
Cachorro (que herda de Animal) deve servir como qualquer outro Animal.
*/

import { Order } from './classes/order';
import { Persistency } from './services/persistency';
import { Product } from './classes/product';
import { Messaging } from './services/service-messaging';
import { ShoppingCart } from './classes/shopping-cart';
import {
  FiftyPercentDiscount,
  NoDiscount,
  TenPercentDiscount,
} from './classes/discount';

const fiftyPercentDiscount = new FiftyPercentDiscount();
// const tenPercentDiscount = new TenPercentDiscount();
// const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(fiftyPercentDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
const order = new Order(shoppingCart, messaging, persistency);

shoppingCart.addItem(new Product('Camiseta', 49.91));
shoppingCart.addItem(new Product('Caderno', 9.9123));
shoppingCart.addItem(new Product('Lápis', 1.59));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
