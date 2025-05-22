"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import { Cart } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
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
                        ></Image>
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded p-2"
                          disabled={isPending}
                          onClick={() => {
                            startTransition(async () => {
                              const res = await removeItemFromCart(
                                item.productId
                              );
                              if (!res.success) {
                                toast.error(res.message);
                              } else {
                                router.refresh();
                              }
                            });
                          }}
                        >
                          {isPending ? (
                            <Loader className="animate-spin" size={16} />
                          ) : (
                            <Minus size={16} />
                          )}
                        </button>
                        <span>{item.qty}</span>

                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded p-2"
                          disabled={isPending}
                          onClick={() => {
                            startTransition(async () => {
                              const res = await addItemToCart(item);
                              if (!res.success) {
                                toast.error(res.message);
                              } else {
                                router.refresh();
                              }
                            });
                          }}
                        >
                          {isPending ? (
                            <Loader className="animate-spin" size={16} />
                          ) : (
                            <Plus size={16} />
                          )}
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card className="mt-5 md:mt-0">
            <CardContent>
              <div className="flex flex-col gap-2">
                <h2 className="h2-bold">Order Summary</h2>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cart.itemsPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${cart.shippingPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${cart.taxPrice}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${cart.totalPrice}</span>
                </div>

                <Button
                  className="w-full mt-4"
                  variant="secondary"
                  size="lg"
                  type="button"
                  onClick={() => {
                    startTransition(() => {
                      router.push("/shipping-address");
                    });
                  }}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader className="animate-spin" size={16} />
                  ) : (
                    <>
                      Proceed to Checkout
                      <ArrowRight className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CartTable;
