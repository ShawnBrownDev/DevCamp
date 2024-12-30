"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardInput } from "./CardInput";
import { AddressInput } from "./AddressInput";

const formSchema = z.object({
  cardNumber: z.string().min(16, "Invalid card number"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date"),
  cvc: z.string().length(3, "Invalid CVC"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

interface CheckoutFormProps {
  onSubmit: (values: CheckoutFormValues) => Promise<void>;
  isLoading?: boolean;
}

export function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps) {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      expiry: "",
      cvc: "",
      street: "",
      city: "",
      zipCode: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CardInput form={form} />
        <AddressInput form={form} />
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : "Complete Purchase"}
        </Button>
      </form>
    </Form>
  );
}