import * as z from "zod";

export const BookDetailsSchema = z.strictObject({
  title: z.string().min(1),
  product_url: z.url(),
  price_text: z.string(),
  price_gbp: z.number().positive(),
  availability_text: z.string(),
  rating_text: z.enum(["One", "Two", "Three", "Four", "Five"]),
  description: z.string().nullable(),
  source_page: z.url(),
  fetched_at: z.iso.datetime(),
});

export type ValidatedBookDetails = z.infer<typeof BookDetailsSchema>;
