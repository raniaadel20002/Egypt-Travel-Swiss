"use client";

import { toast, ExternalToast } from "sonner";
import React from "react";

type ToastMethod = (message: any, data?: ExternalToast) => string | number;

function extractToastText(content: unknown): string {
  if (content === null || content === undefined) return "";
  if (
    typeof content === "string" ||
    typeof content === "number" ||
    typeof content === "boolean"
  ) {
    return String(content).trim();
  }
  if (typeof content === "function") {
    try {
      const res = (content as () => unknown)();
      return extractToastText(res);
    } catch {
      return "fn";
    }
  }
  if (typeof content === "object") {
    if (React.isValidElement(content)) {
      const props = (content as React.ReactElement<{ children?: unknown }>).props;
      if (props?.children) {
        return extractToastText(props.children);
      }
    }
    if ("message" in (content as Record<string, unknown>)) {
      return extractToastText((content as { message?: unknown }).message);
    }
    try {
      return JSON.stringify(content);
    } catch {
      return String(content);
    }
  }
  return String(content);
}

export function generateToastId(
  type: string,
  message: unknown,
  data?: ExternalToast
): string | number {
  if (
    data?.id !== undefined &&
    data.id !== null &&
    String(data.id).length > 0
  ) {
    return data.id;
  }
  const messageKey = extractToastText(message);
  const descKey = data?.description
    ? `:${extractToastText(data.description)}`
    : "";
  return `${type}:${messageKey}${descKey}`;
}

const DEDUPLICATED_FLAG = Symbol.for("egypt_dreams_toast_deduplicated");

export function setupToastDeduplication(): void {
  if ((toast as any)[DEDUPLICATED_FLAG]) {
    return;
  }

  const originalMethods = {
    success: toast.success,
    error: toast.error,
    warning: toast.warning,
    info: toast.info,
    message: toast.message,
    loading: toast.loading,
    custom: toast.custom,
  };

  function createDeduplicatedMethod(
    type: string,
    origFn: ToastMethod
  ): ToastMethod {
    return function deduplicatedToast(message: any, data?: ExternalToast) {
      const toastId = generateToastId(type, message, data);

      if (typeof toast.getToasts === "function") {
        const activeToasts = toast.getToasts();
        const isAlreadyVisible = activeToasts.some(
          (t: any) => t.id === toastId && !t.dismiss
        );
        if (isAlreadyVisible) {
          return toastId;
        }
      }

      return origFn.call(toast, message, {
        ...data,
        id: toastId,
      });
    };
  }

  toast.success = createDeduplicatedMethod("success", originalMethods.success);
  toast.error = createDeduplicatedMethod("error", originalMethods.error);
  toast.warning = createDeduplicatedMethod("warning", originalMethods.warning);
  toast.info = createDeduplicatedMethod("info", originalMethods.info);
  toast.message = createDeduplicatedMethod("message", originalMethods.message);
  toast.loading = createDeduplicatedMethod("loading", originalMethods.loading);

  if (typeof originalMethods.custom === "function") {
    const originalCustom = originalMethods.custom;
    toast.custom = function deduplicatedCustom(jsx: any, data?: ExternalToast) {
      const toastId =
        data?.id !== undefined && data.id !== null && String(data.id).length > 0
          ? data.id
          : "custom:toast";

      if (typeof toast.getToasts === "function") {
        const activeToasts = toast.getToasts();
        const isAlreadyVisible = activeToasts.some(
          (t: any) => t.id === toastId && !t.dismiss
        );
        if (isAlreadyVisible) {
          return toastId;
        }
      }

      return originalCustom.call(toast, jsx, {
        ...data,
        id: toastId,
      });
    };
  }

  (toast as any)[DEDUPLICATED_FLAG] = true;
}

// Auto-initialize on module load
setupToastDeduplication();

export { toast };
