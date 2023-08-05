import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().nonempty({ message: "Prompt is required" }),
});
