
export const getBumfiPaymentLink = (
  id: string,
  args?: {
    [key in "email" | "name" | "customer_ident" | "redirect_to"]?: string;
  }
) => {
  const config = useRuntimeConfig();
  const paymentURL = new URL(
    import.meta.server
      ? config.BUMFI_PAYMENT_URL
      : config.public.BUMFI_PAYMENT_URL
  );

  paymentURL.pathname = id;

  if (args)
    for (const [name, value] of Object.entries(args))
      paymentURL.searchParams.append(name, value);

  return paymentURL;
};
