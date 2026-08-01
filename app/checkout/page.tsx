import Link from "next/link";

import { CartProvider } from "@/components/cart/cart-context";
import {
  formatStoreHoursLabel,
  getSelectablePickupSlots,
  getStoreSettings,
} from "@/lib/store-settings";
import { checkStoreStatus } from "@/lib/store-status";
import { quoteGifts } from "@/lib/pricing/coupons-gifts";
import { CheckoutForm } from "./checkout-form";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Checkout — Casagrande SaaS",
  description: "Finalize seu pedido e pague no Mercado Pago.",
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const [slots, settings, storeStatus, giftQuote] = await Promise.all([
    getSelectablePickupSlots(),
    getStoreSettings(),
    checkStoreStatus({ fulfillmentMode: "pickup" }),
    quoteGifts(0),
  ]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-50">
        <header className="border-b border-blue-100 bg-white shadow-sm">
          <div className="container flex h-16 items-center justify-between">
            <Link
              href="/"
              className="font-serif text-xl font-semibold text-slate-800"
            >
              Casagrande SaaS
            </Link>
            <Button asChild variant="ghost" className="text-slate-600">
              <Link href="/">Continuar comprando</Link>
            </Button>
          </div>
        </header>

        <main className="container max-w-5xl py-8 sm:py-12">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-slate-800">
              Checkout
            </h1>
            <p className="mt-1 text-stone-500">
              PIX, crédito ou débito · retirada no local. Sem login, sem SMS.
            </p>
          </div>
          <CheckoutForm
            pickupSlots={slots}
            hoursLabel={formatStoreHoursLabel(
              settings.openTime,
              settings.closeTime
            )}
            storeOpen={storeStatus.isOpen}
            closedMessage={storeStatus.message}
            minOrderValue={settings.minOrderValue}
            gifts={giftQuote.gifts.map((g) => ({
              id: g.id,
              name: g.name,
              minPurchaseValue: g.minPurchaseValue,
              imageUrl: g.imageUrl,
            }))}
          />
        </main>
      </div>
    </CartProvider>
  );
}
