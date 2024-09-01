import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components';
import { OrderInformation } from './components/OrderInformation';
import React from 'react';

type OrderHistoryEmailProps = {
  orders: {
    id: string;
    pricePaidInCents: number;
    createdAt: Date;
    downloadVerificationId: string;
    product: { imagePath: string; name: string; description: string };
  }[];
};

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 1000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: 'Preview product name',
        imagePath:
          '/products/447872a9-1891-439c-9544-d3982cf92256-flowers-tyulpan-trava-tsvetok-flora-tsvetenie-117612.jpeg',
        description: 'Preview product description',
      },
    },
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 1000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: 'Preview product name',
        imagePath:
          '/products/447872a9-1891-439c-9544-d3982cf92256-flowers-tyulpan-trava-tsvetok-flora-tsvetenie-117612.jpeg',
        description: 'Preview product description',
      },
    },
  ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History & Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className='bg-white font-sans'>
          <Container className='max-w-xl'>
            <Heading>Purchase Receipt</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderInformation
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
