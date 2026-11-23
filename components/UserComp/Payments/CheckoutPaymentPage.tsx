"use client";

import React from "react";
import Link from "next/link";
import { FiArrowLeft, FiChevronRight, FiLock } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { isPayPalConfigured } from "@/config/paypalConfig";
import PayPalProvider from "@/shared/providers/PayPalProvider";
import { usePaypalCheckout } from "@/features/payments/usePaypalCheckout";
import PaymentSummaryHeader from "./PaymentSummaryHeader";
import PaymentStatusBanner from "./PaymentStatusBanner";
import PaymentCardForm from "./PaymentCardForm";

export default function CheckoutPaymentPage() {
  const { locale, dictionary } = useLocale();
  const t = dictionary.paymentPage || {};

  const {
    session,
    hydrated,
    isPaying,
    isReinitializing,
    errorMessage,
    setIsPaying,
    setErrorMessage,
    createOrder,
    handleApprove,
    handleCardError,
    handleRetryInitialize,
  } = usePaypalCheckout();

  const configured = isPayPalConfigured();

  if (!hydrated) {
    return (
      <div className="w-full bg-[#F7EDE1] min-h-screen py-16 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#013E51] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7EDE1] min-h-screen py-10 sm:py-14 lg:py-16 font-[family-name:var(--font-lato)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        <div>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-[#013E51]/70 mb-3"
          >
            <Link href={`/${locale}`} className="hover:text-[#013E51] transition-colors">
              {t.breadcrumbHome || "Home"}
            </Link>
            <FiChevronRight className="w-3.5 h-3.5" />
            <span className="font-bold text-[#013E51]">
              {t.breadcrumbPayment || "Secure Card Payment"}
            </span>
          </nav>

          <div className="flex items-center gap-2 text-xs font-bold text-[#E8B34A] uppercase tracking-wider mb-1">
            <FiLock className="w-3.5 h-3.5" />
            <span>{t.eyebrow || "Encrypted Online Checkout"}</span>
          </div>
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#013E51]">
            {t.pageTitle || "Complete Your Payment"}
          </h1>
          <p className="text-sm sm:text-base text-[#013E51]/75 max-w-2xl mt-1">
            {t.pageSubtitle ||
              "Pay securely with your debit or credit card directly on our website to confirm your booking immediately."}
          </p>
        </div>

        {!session ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#013E51]/10 shadow-sm text-center space-y-4">
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
              {t.noSessionTitle || "No Active Payment Session"}
            </h2>
            <p className="text-sm text-[#013E51]/70 max-w-md mx-auto">
              {t.noSessionDesc ||
                "Your payment session could not be found or has already been completed. Please return to your cart or diving courses to start a booking."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href={`/${locale}/cart`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#013E51] text-white text-xs sm:text-sm font-bold hover:bg-[#022c3a] transition"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>{t.backToCart || "Back to Cart"}</span>
              </Link>
              <Link
                href={`/${locale}/diving-courses`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#013E51]/20 text-[#013E51] text-xs sm:text-sm font-bold hover:bg-[#013E51]/5 transition"
              >
                <span>{t.browseDiving || "Browse Diving Courses"}</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              {!configured && (
                <PaymentStatusBanner
                  variant="warning"
                  message={
                    t.missingConfig ||
                    "Online card payment is temporarily unavailable because the PayPal client configuration is not set. Please contact our concierge team to finalize your booking."
                  }
                />
              )}

              {errorMessage && (
                <PaymentStatusBanner
                  variant="error"
                  message={errorMessage}
                  onRetry={handleRetryInitialize}
                  retryLabel={t.retrySession || "Refresh Payment Session"}
                  isRetrying={isReinitializing}
                />
              )}

              {configured && (
                <PayPalProvider currency={session.currency} locale={locale}>
                  <PaymentCardForm
                    amount={session.amount}
                    currency={session.currency}
                    isPaying={isPaying}
                    setIsPaying={setIsPaying}
                    setErrorMessage={setErrorMessage}
                    createOrder={createOrder}
                    onApprove={handleApprove}
                    onError={handleCardError}
                    labels={{
                      cardDetailsHeading: t.cardDetailsHeading || "Card Details",
                      cardDetailsSubtitle:
                        t.cardDetailsSubtitle ||
                        "Enter your credit or debit card information below. Processed securely by PayPal.",
                      cardholderName: t.cardholderName || "Cardholder Name",
                      cardNumber: t.cardNumber || "Card Number",
                      expiryDate: t.expiryDate || "Expiry Date (MM/YY)",
                      cvv: t.cvv || "Security Code (CVV)",
                      payNow: t.payNow || "Pay Now",
                      processing: t.processing || "Processing Payment...",
                      secureNote:
                        t.secureNote ||
                        "256-bit SSL encrypted. Your card details are handled directly by PayPal and never stored on our servers.",
                      loadingFields: t.loadingFields || "Loading secure card fields...",
                      sdkLoadError:
                        t.sdkLoadError ||
                        "Unable to load PayPal card fields. Please refresh the page or check your connection.",
                      invalidCardFields:
                        t.invalidCardFields ||
                        "Please check that your card number, expiry date, and CVV are valid.",
                    }}
                  />
                </PayPalProvider>
              )}
            </div>

            <div className="lg:col-span-5">
              <PaymentSummaryHeader
                session={session}
                labels={{
                  orderSummary: t.orderSummary || "Order Summary",
                  bookingTypeTrip: t.bookingTypeTrip || "Trip & Excursion Booking",
                  bookingTypeDiving: t.bookingTypeDiving || "Diving Course Booking",
                  reference: t.reference || "Booking Reference",
                  guest: t.guest || "Lead Guest",
                  amountDue: t.amountDue || "Total Amount Due",
                  verifiedByServer:
                    t.verifiedByServer ||
                    "Final amount verified by server. Instant booking confirmation upon payment.",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
