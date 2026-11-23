"use client";

import React, { useState } from "react";
import {
  PayPalCardFieldsProvider,
  PayPalNameField,
  PayPalNumberField,
  PayPalExpiryField,
  PayPalCVVField,
  usePayPalCardFields,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { FiCreditCard, FiLock, FiLoader, FiUser, FiCalendar, FiShield } from "react-icons/fi";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import PaymentStatusBanner from "./PaymentStatusBanner";

interface CardFormLabels {
  cardDetailsHeading: string;
  cardDetailsSubtitle: string;
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  payNow: string;
  processing: string;
  secureNote: string;
  loadingFields: string;
  sdkLoadError: string;
  invalidCardFields: string;
}

interface PaymentCardFormProps {
  amount: number;
  currency: string;
  isPaying: boolean;
  setIsPaying: (val: boolean) => void;
  setErrorMessage: (msg: string | null) => void;
  createOrder: () => Promise<string>;
  onApprove: (data: { orderID: string }) => Promise<void>;
  onError: (err: Record<string, unknown>) => void;
  labels: CardFormLabels;
}

const CARD_FIELD_STYLE = {
  input: {
    "font-size": "15px",
    "font-family": "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#013E51",
    border: "none",
    outline: "none",
    padding: "12px 14px",
    "line-height": "1.5",
  },
  ":focus": {
    color: "#013E51",
    border: "none",
    outline: "none",
  },
  "input::placeholder": {
    color: "#9CA3AF",
  },
  ".invalid": {
    color: "#DC2626",
    border: "none",
    outline: "none",
  },
};

interface SubmitCardButtonProps {
  amount: number;
  currency: string;
  isPaying: boolean;
  setIsPaying: (val: boolean) => void;
  setErrorMessage: (msg: string | null) => void;
  labels: CardFormLabels;
}

function SubmitCardButton({
  amount,
  currency,
  isPaying,
  setIsPaying,
  setErrorMessage,
  labels,
}: SubmitCardButtonProps) {
  const { cardFieldsForm } = usePayPalCardFields();
  const [submittingForm, setSubmittingForm] = useState(false);

  const upperCurrency = (currency || "EUR").toUpperCase();
  const symbol =
    upperCurrency === "EUR"
      ? "\u20AC"
      : upperCurrency === "USD"
      ? "$"
      : upperCurrency === "GBP"
      ? "\u00A3"
      : `${upperCurrency} `;

  const handlePayClick = async () => {
    if (!cardFieldsForm || isPaying || submittingForm) return;

    try {
      setErrorMessage(null);
      const formState = await cardFieldsForm.getState();
      if (!formState.isFormValid) {
        setErrorMessage(labels.invalidCardFields);
        return;
      }
      setSubmittingForm(true);
      setIsPaying(true);
      await cardFieldsForm.submit();
    } catch (err) {
      setIsPaying(false);
      const message =
        err instanceof Error && err.message
          ? err.message
          : labels.invalidCardFields;
      setErrorMessage(message);
    } finally {
      setSubmittingForm(false);
    }
  };

  const busy = isPaying || submittingForm;

  return (
    <button
      type="button"
      onClick={handlePayClick}
      disabled={busy || !cardFieldsForm}
      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#E8B34A] via-[#dfa536] to-[#E8B34A] hover:brightness-105 active:scale-[0.99] text-[#013E51] font-bold text-sm sm:text-base tracking-wider uppercase shadow-[0_4px_16px_rgba(232,179,74,0.3)] hover:shadow-[0_6px_20px_rgba(232,179,74,0.4)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center justify-center gap-2"
    >
      {busy ? (
        <>
          <FiLoader className="w-4 h-4 animate-spin" />
          <span>{labels.processing}</span>
        </>
      ) : (
        <>
          <FiLock className="w-4 h-4 stroke-[2.5]" />
          <span>
            Pay 50% Deposit ({symbol}
            {Number(amount || 0).toFixed(2)})
          </span>
        </>
      )}
    </button>
  );
}

export default function PaymentCardForm({
  amount,
  currency,
  isPaying,
  setIsPaying,
  setErrorMessage,
  createOrder,
  onApprove,
  onError,
  labels,
}: PaymentCardFormProps) {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-3 min-h-[300px]">
        <FiLoader className="w-7 h-7 text-[#013E51] animate-spin" />
        <p className="text-sm text-[#013E51]/75 font-medium">
          {labels.loadingFields}
        </p>
      </div>
    );
  }

  if (isRejected) {
    return <PaymentStatusBanner message={labels.sdkLoadError} variant="error" />;
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0px_12px_32px_0px_#013E511A] border border-gray-100 space-y-6 font-[family-name:var(--font-lato)]">
      {/* Header with Accepted Cards Badge */}
      <div className="pb-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#E8B34A] uppercase tracking-wider mb-1">
            <FiCreditCard className="w-4 h-4" />
            <span>PayPal Card Checkout</span>
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
            {labels.cardDetailsHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#013E51]/70 mt-1">
            {labels.cardDetailsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 p-2 px-3 rounded-xl bg-gray-50 border border-gray-200/70 shadow-2xs">
          <FaCcVisa className="w-7 h-5 text-[#1A1F71]" title="Visa" />
          <FaCcMastercard className="w-7 h-5 text-[#EB001B]" title="Mastercard" />
          <FaCcAmex className="w-7 h-5 text-[#006FCF]" title="American Express" />
        </div>
      </div>

      <PayPalCardFieldsProvider
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        style={CARD_FIELD_STYLE}
      >
        <div className="space-y-4">
          {/* Cardholder Name */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#013E51]">
              <FiUser className="w-3.5 h-3.5 text-[#E8B34A]" />
              <span>{labels.cardholderName}</span>
            </label>
            <div className="rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus-within:border-[#013E51] focus-within:ring-2 focus-within:ring-[#013E51]/15 shadow-2xs transition-all overflow-hidden min-h-[46px]">
              <PayPalNameField placeholder="Full name on card" />
            </div>
          </div>

          {/* Card Number */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#013E51]">
                <FiCreditCard className="w-3.5 h-3.5 text-[#E8B34A]" />
                <span>{labels.cardNumber}</span>
              </label>
              <span className="text-[11px] font-semibold text-gray-400">Debit or Credit</span>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus-within:border-[#013E51] focus-within:ring-2 focus-within:ring-[#013E51]/15 shadow-2xs transition-all overflow-hidden min-h-[46px]">
              <PayPalNumberField placeholder="Card number" />
            </div>
          </div>

          {/* Expiry & CVV */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#013E51]">
                <FiCalendar className="w-3.5 h-3.5 text-[#E8B34A]" />
                <span>{labels.expiryDate}</span>
              </label>
              <div className="rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus-within:border-[#013E51] focus-within:ring-2 focus-within:ring-[#013E51]/15 shadow-2xs transition-all overflow-hidden min-h-[46px]">
                <PayPalExpiryField placeholder="MM / YY" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#013E51]">
                <FiShield className="w-3.5 h-3.5 text-[#E8B34A]" />
                <span>{labels.cvv}</span>
              </label>
              <div className="rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus-within:border-[#013E51] focus-within:ring-2 focus-within:ring-[#013E51]/15 shadow-2xs transition-all overflow-hidden min-h-[46px]">
                <PayPalCVVField placeholder="CVV" />
              </div>
            </div>
          </div>

          {/* Submit Pay Now Button */}
          <div className="pt-3">
            <SubmitCardButton
              amount={amount}
              currency={currency}
              isPaying={isPaying}
              setIsPaying={setIsPaying}
              setErrorMessage={setErrorMessage}
              labels={labels}
            />
          </div>

          {/* Security Notice */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#013E51]/70 pt-1">
            <FiLock className="w-3.5 h-3.5 text-[#E8B34A] shrink-0" />
            <span>{labels.secureNote}</span>
          </div>
        </div>
      </PayPalCardFieldsProvider>
    </div>
  );
}
