"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Order, OrderItem } from "@/types"; // ← import OrderItem
import Image from "next/image";
import Link from "next/link";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import {
  approvePayPalOrder,
  createPayPalOrder,
  deliverOrder,
  updateOrderToPaidByCOD,
} from "@/lib/actions/order.actions";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import StripePayment from "./stripe-payment";

const OrderDetailsTable = ({
  order,
  paypalClientId,
  isAdmin,
  stripeClientSecret,
}: {
  order: Omit<Order, "paymentResult">;
  paypalClientId: string;
  isAdmin: boolean;
  stripeClientSecret: string | null;
}) => {
  const {
    id: orderId,
    shippingAddress,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isDelivered,
    isPaid,
    paidAt,
    deliveredAt,
  } = order;

  // Shows PayPal loading/errors
  const PrintLoadingState: React.FC = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    if (isPending) return <p>Loading PayPal…</p>;
    if (isRejected) return <p>Error loading PayPal.</p>;
    return null;
  };

  const handleCreatePayPalOrder = async () => {
    const res = await createPayPalOrder(orderId);
    if (!res.success) {
      toast.error(res.message || "Failed to create PayPal order");
      return;
    }
    return res.data;
  };

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const res = await approvePayPalOrder(orderId, data);
    if (!res.success) {
      toast.error(res.message || "Failed to approve PayPal order");
      return;
    }
    toast.success("Order paid successfully");
    window.location.reload();
  };
  const MarkAsPaidButton = () => {
    const [isPending, startTransition] = useTransition();

    return (
      <Button
        type="button"
        className="bg-brand hover:bg-brand-dark text-white transition-colors"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToPaidByCOD(order.id);
            if (!res.success) {
              toast.error(res.message || "Failed to mark order as paid");
              return;
            }
            toast.success("Order marked as paid successfully");
          })
        }
      >
        {isPending ? "processing..." : "Mark As Paid"}
      </Button>
    );
  };

  const MarkAsDeliveredButton = () => {
    const [isPending, startTransition] = useTransition();

    return (
      <Button
        type="button"
        className="bg-brand hover:bg-brand-dark text-white transition-colors"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await deliverOrder(order.id);
            if (!res.success) {
              toast.error(res.message || "Failed to mark order as delivered");
              return;
            }
            toast.success("Order marked as delivered successfully");
          })
        }
      >
        {isPending ? "processing..." : "Mark As Delivered"}
      </Button>
    );
  };

  return (
    <>
      <h1 className="py-4 text-2xl">Order {formatId(orderId)}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-y-4 overflow-x-auto">
          {/* Payment Method */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p className="mb-2">{paymentMethod}</p>
              {isPaid ? (
                <Badge variant="secondary">
                  Paid at {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not paid</Badge>
              )}
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="my-2">
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl pb-4">Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p className="mb-2">
                {shippingAddress.streetAddress}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              {isDelivered ? (
                <Badge variant="secondary">
                  Delivered at {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not Delivered</Badge>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl pb-4">Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item: OrderItem) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="px-2">{item.qty}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary & PayPal */}
        <div>
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between">
                <div>Items</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax</div>
                <div>{formatCurrency(taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Total</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>

              {/* only show PayPal buttons if not paid */}
              {!isPaid && paymentMethod === "PayPal" && (
                <div>
                  <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                    <PrintLoadingState />
                    <PayPalButtons
                      createOrder={handleCreatePayPalOrder}
                      onApprove={handleApprovePayPalOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
              {/* Stripe Payment */}
              {!isPaid && paymentMethod === "Stripe" && stripeClientSecret && (
                <StripePayment
                  priceInCents={Number(order.totalPrice) * 100}
                  orderId={order.id}
                  clientSecret={stripeClientSecret}
                />
              )}

              {/* Cash On Delivery */}
              {isAdmin && !isPaid && paymentMethod === "CashOnDelivery" && (
                <MarkAsPaidButton />
              )}
              {isAdmin && isPaid && !isDelivered && <MarkAsDeliveredButton />}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsTable;
