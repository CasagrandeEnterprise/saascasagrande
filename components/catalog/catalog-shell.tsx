"use client";

import { CartProvider } from "@/components/cart/cart-context";
import { Header, type HeaderCategory } from "@/components/layout/Header";

/**
 * Shell do catálogo (client, por causa do CartProvider).
 *
 * O rodapé chega como slot renderizado no servidor: o `Footer` é um Server
 * Component async que consulta o banco via Prisma, então importá-lo aqui o
 * arrastaria para o bundle do cliente ("PrismaClient is unable to run in this
 * browser environment").
 */
export function CatalogShell({
  categories,
  footer,
  children,
}: {
  categories: HeaderCategory[];
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header categories={categories} showCart />
        <main className="flex-1">{children}</main>
        {footer}
      </div>
    </CartProvider>
  );
}
