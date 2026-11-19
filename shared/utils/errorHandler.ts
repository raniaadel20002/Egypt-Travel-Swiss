import axios from "axios";
import { toast } from "sonner";

export function extractApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const responseData = error.response?.data;

    if (responseData) {
      if (typeof responseData === "string" && responseData.trim().length > 0) {
        return responseData;
      }

      if (typeof responseData === "object") {
        const rawObj = responseData as Record<string, unknown>;
        const errors = rawObj.errors || rawObj.Errors;

        if (Array.isArray(errors) && errors.length > 0) {
          return errors.join(" | ");
        }

        if (errors && typeof errors === "object") {
          const messages = Object.values(errors)
            .flat()
            .filter((msg): msg is string => typeof msg === "string");
          if (messages.length > 0) {
            return messages.join(" | ");
          }
        }

        if (typeof errors === "string" && errors.trim().length > 0) {
          return errors;
        }

        const message = rawObj.message || rawObj.Message;
        if (typeof message === "string" && message.trim().length > 0) {
          return message;
        }

        const detail = rawObj.detail || rawObj.Detail;
        if (typeof detail === "string" && detail.trim().length > 0) {
          return detail;
        }

        const title = rawObj.title || rawObj.Title;
        if (typeof title === "string" && title.trim().length > 0) {
          return title;
        }
      }
    }

    if (status === 403) {
      return "Access denied (403 Forbidden). Your account does not have permission for this resource.";
    }

    if (status === 401) {
      return "Unauthorized (401). Your session has expired. Please sign in again.";
    }

    if (error.message === "Network Error") {
      return "Network connection issue. Please check your internet connection or server availability.";
    }

    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
}

export function showApiErrorToast(error: unknown): void {
  const message = extractApiError(error);
  toast.error(message);
}

export function extractErrorMessage(
  error: unknown,
  fallbackMessage = "An error occurred"
): string {
  const extracted = extractApiError(error);
  return extracted || fallbackMessage;
}
