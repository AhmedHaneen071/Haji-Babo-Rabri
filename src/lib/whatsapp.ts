import { CartItem, CheckoutForm } from '@/types';

export const WHATSAPP_NUMBER = '923122307882';

export function generateWhatsAppMessage(
  items: CartItem[],
  customer?: Partial<CheckoutForm>,
  discount = 0,
  couponCode?: string
): string {
  let message = ' *New Order  Haji Babo Rabri*\n';
  message += '_Heritage in every spoon_ \n\n';

  if (customer?.fullName) {
    message += ` *Customer:* ${customer.fullName}\n`;
  }
  if (customer?.phone) {
    message += ` *Phone:* ${customer.phone}\n`;
  }
  if (customer?.address) {
    message += ` *Address:* ${customer.address}`;
    if (customer.city) message += `, ${customer.city}`;
    message += '\n';
  }

  message += `\n *Order Details:*\n`;
  message += '\n';

  let total = 0;
  items.forEach((item) => {
    const itemTotal =
      item.product.price !== null ? item.product.price * item.quantity : 0;
    if (item.product.price !== null) total += itemTotal;
    message += ` ${item.product.name}  ${item.quantity}`;
    if (item.product.price !== null) {
      message += ` = PKR ${itemTotal.toLocaleString()}`;
    } else {
      message += ` (Price on request)`;
    }
    message += '\n';
  });

  message += '\n';
  if (total > 0) {
    message += ` *Subtotal:* PKR ${total.toLocaleString()}\n`;
    if (discount > 0) {
      message += ` *Discount${couponCode ? ` (${couponCode})` : ''}:* -PKR ${discount.toLocaleString()}\n`;
    }
    message += ` *Delivery:* To be confirmed\n`;
    const deliveryCharge = 200;
    message += ` *Total:* PKR ${(total + deliveryCharge - discount).toLocaleString()}\n`;
  }

  if (customer?.paymentMethod) {
    const paymentLabels = {
      cod: 'Cash on Delivery',
      'bank-transfer': 'Bank Transfer',
      online: 'Online Payment',
    };
    message += ` *Payment:* ${paymentLabels[customer.paymentMethod as keyof typeof paymentLabels] || customer.paymentMethod}\n`;
  }

  if (customer?.notes) {
    message += `\n *Notes:* ${customer.notes}\n`;
  }

  message += `\n_Order placed via hajibaborabri.com_`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function generateSimpleWhatsAppLink(): string {
  const message = encodeURIComponent(
    'Assalam o Alaikum! I would like to place an order from Haji Babo Rabri. '
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}
