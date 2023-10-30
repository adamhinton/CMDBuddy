import { z } from "zod";
import { ParameterSchema } from "./ParameterSchema";

export const CommandSchema = z.object({
	id: z.string().uuid(),
	baseCommand: z.string(),
	title: z.string(),
	order: z.number().int(),
	userID: z.string().uuid(),
	parameters: z.array(ParameterSchema).optional(),
});

export type CMDBuddyCommand = z.infer<typeof CommandSchema>;
