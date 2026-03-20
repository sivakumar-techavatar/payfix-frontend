import { z } from "zod";

export const contactSchema = z.object({
  first: z.string().min(1, "First name is required"),
  last: z.string().optional(),
  company: z.string().min(1, "Company name is required"),
  email: z.email("Invalid email"),
  phone: z.string().min(8, "Phone number is required"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
});
