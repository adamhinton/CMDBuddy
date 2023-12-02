import { z } from "zod";

export const ParameterSchema = z.object({
	id: z.string().uuid(),
	type: z.enum(["STRING", "INT", "BOOLEAN", "DROPDOWN"]),
	// Easier to leave this as string and convert it
	defaultValue: z.string().optional(),
	name: z.string(),
	order: z.number().int(),
	validationRegex: z.string().optional(),
	minLength: z.number().int().optional(),
	maxLength: z.number().int().optional(),
	minValue: z.number().int().optional(),
	maxValue: z.number().int().optional(),
	isNullable: z.boolean(),
	allowedValues: z.array(z.string()).optional(),
	commandID: z.string().uuid(),
});

export type CMDBuddyParameter = z.infer<typeof ParameterSchema>;
