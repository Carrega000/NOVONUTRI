import type { Metadata } from "next";
import type React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nutri — Acompanhe sua alimentação com uma foto",
  description:
    "Analise calorias, proteínas, carboidratos e gorduras a partir de uma foto da sua refeição.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
