import { z } from "zod";

// FLAG Is stuff like `--headed` or `--all` which you either include in the command or don't.
// BOOLEAN is a true/false variable, like `isLookingForJob=true`
// Many Parameters belong to one Command

export const ParameterSchema = z.object({
	id: z.string().uuid(),
	type: z.enum(["STRING", "INT", "BOOLEAN", "DROPDOWN", "FLAG"]),
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
