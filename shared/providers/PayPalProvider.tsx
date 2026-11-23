"use client";

import React, { useMemo } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { getPayPalScriptOptions } from "@/config/paypalConfig";

interface PayPalProviderProps {
  currency?: string;
  locale?: string;
  children: React.ReactNode;
}

export default function PayPalProvider({
  currency,
  locale,
  children,
}: PayPalProviderProps) {
  const options = useMemo(
    () => getPayPalScriptOptions({ currency, locale }),
    [currency, locale]
  );

  return (
    <PayPalScriptProvider options={options}>{children}</PayPalScriptProvider>
  );
}
