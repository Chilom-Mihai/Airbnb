"use client";

import * as React from "react";
import { Toaster as RadixToaster, toast as radixToast } from "sonner";

export function useToast() {
  return {
    toast: (props: { description: string }) => {
      radixToast(props.description);
    },
  };
}

export const Toaster = () => <RadixToaster position="top-right" richColors />;
