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

interface AddressInputProps {
  form: UseFormReturn<any>;
}

export function AddressInput({ form }: AddressInputProps) {
  return (
    <div className="space-y-4">
      <FormLabel>Billing Address</FormLabel>
      
      <FormField
        control={form.control}
        name="street"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Street address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="ZIP code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}