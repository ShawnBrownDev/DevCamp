"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CardInputProps {
  form: UseFormReturn<any>;
}

export function CardInput({ form }: CardInputProps) {
  return (
    <div className="space-y-4">
      <FormLabel>Card Information</FormLabel>
      
      <FormField
        control={form.control}
        name="cardNumber"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Card number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="expiry"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="MM/YY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cvc"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="CVC" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}