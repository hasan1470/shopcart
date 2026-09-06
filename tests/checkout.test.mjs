import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCart } from '../lib/checkout-validation.ts';
import { makeDemoOrder } from '../lib/demo-orders.ts';
const catalog = [{ _id: 'p1', name: 'Headphones', price: 49.95, stock: 3 }];
test('checkout ignores forged browser prices and uses the current catalog', () => {
  const [line] = validateCart([{product:{_id:'p1',price:0.01},quantity:2}], catalog);
  assert.equal(line.unitAmount, 4995);
  assert.equal(line.quantity, 2);
});
test('duplicate cart rows cannot bypass stock checks', () => {
  assert.throws(() => validateCart([{product:{_id:'p1'},quantity:2},{product:{_id:'p1'},quantity:2}], catalog), /Only 3/);
});
test('invalid quantities, empty carts and unavailable products are rejected', () => {
  for (const quantity of [0,-1,0.5,100,NaN,Infinity,'2']) assert.throws(() => validateCart([{product:{_id:'p1'},quantity}], catalog));
  assert.throws(() => validateCart([], catalog));
  assert.throws(() => validateCart([{product:{_id:'missing'},quantity:1}], catalog));
});

test('demo checkout snapshots prices, includes shipping and survives cart changes', () => {
  const input = [{product:{_id:'p1',name:'Headphones',price:49.95,stock:3},quantity:2}];
  const order = makeDemoOrder(validateCart(input,catalog),'express','DEMO-example','2026-09-07T00:00:00Z');
  input[0].product.price=0;
  input[0].quantity=1;
  assert.equal(order.subtotal,9990);
  assert.equal(order.shipping,499);
  assert.equal(order.total,10489);
  assert.equal(order.items[0].quantity,2);
  assert.equal(order.status,'confirmed');
});
