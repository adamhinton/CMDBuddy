import { z } from "zod";
import { ParameterSchema } from "../zod/ParameterSchema";
ParameterSchema;

// Subtypes for each parameter type
const StringParameterSchema = ParameterSchema.pick({
	type: true,
	defaultValue: true,
	name: true,
	validationRegex: true,
	minLength: true,
	maxLength: true,
	isNullable: true,
}).extend({
	type: z.literal("STRING"),
	// Making Order optional because we only add it on submit
	order: z.number().int().optional(),
	// id and commandID are optional because it's only needed in "edit" mode
	id: z.string().uuid().optional(),
	commandID: z.string().uuid().optional(),
	// Lets onSubmit know that the param has/hasn't been changed and does/doesn't need to be updated
	// false by default
	hasBeenEdited: z.boolean().default(false).optional(),
});

const IntParameterSchema = ParameterSchema.pick({
	type: true,
	defaultValue: true,
	name: true,
	minValue: true,
	maxValue: true,
	isNullable: true,
}).extend({
	type: z.literal("INT"),
	// Making Order optional because we only add it on submit
	order: z.number().int().optional(),
	// id and commandID are optional because it's only needed in "edit" mode
	id: z.string().uuid().optional(),
	commandID: z.string().uuid().optional(),
	// Lets onSubmit know that the param has/hasn't been changed and does/doesn't need to be updated
	// false by default
	hasBeenEdited: z.boolean().default(false).optional(),
});

const BooleanParameterSchema = ParameterSchema.pick({
	type: true,
	defaultValue: true,
	name: true,
	isNullable: true,
}).extend({
	type: z.literal("BOOLEAN"),
	// Making Order optional because we only add it on submit
	order: z.number().int().optional(),
	// id and commandID are optional because it's only needed in "edit" mode
	id: z.string().uuid().optional(),
	commandID: z.string().uuid().optional(),
	// Lets onSubmit know that the param has/hasn't been changed and does/doesn't need to be updated
	// false by default
	hasBeenEdited: z.boolean().default(false).optional(),
});

const DropdownParameterSchema = ParameterSchema.pick({
	type: true,
	defaultValue: true,
	name: true,
	allowedValues: true,
	isNullable: true,
}).extend({
	type: z.literal("DROPDOWN"),
	// Making Order optional because we only add it on submit
	order: z.number().int().optional(),
	// id and commandID are optional because it's only needed in "edit" mode
	id: z.string().uuid().optional(),
	commandID: z.string().uuid().optional(),
	// Lets onSubmit know that the param has/hasn't been changed and does/doesn't need to be updated
	// false by default
	hasBeenEdited: z.boolean().default(false).optional(),
});

const FlagParameterSchema = ParameterSchema.pick({
	type: true,
	defaultValue: true,
	name: true,
}).extend({
	type: z.literal("FLAG"),
	// Making Order optional because we only add it on submit
	order: z.number().int().optional(),
	defaultValue: z.enum(["On", "Off"]),
	// id and commandID are optional because it's only needed in "edit" mode
	id: z.string().uuid().optional(),
	commandID: z.string().uuid().optional(),
	// Lets onSubmit know that the param has/hasn't been changed and does/doesn't need to be updated
	// false by default
	hasBeenEdited: z.boolean().default(false).optional(),
});

export const CommandCreationZodSchemas = {
	StringParameterSchema,
	IntParameterSchema,
	BooleanParameterSchema,
	DropdownParameterSchema,
	FlagParameterSchema,
};

type StringParameter = z.infer<typeof StringParameterSchema>;
type IntParameter = z.infer<typeof IntParameterSchema>;
type BooleanParameter = z.infer<typeof BooleanParameterSchema>;
type DropdownParameter = z.infer<typeof DropdownParameterSchema>;
type FlagParameter = z.infer<typeof FlagParameterSchema>;

type AnyParameter =
	| StringParameter
	| IntParameter
	| BooleanParameter
	| DropdownParameter
	| FlagParameter;

export type {
	StringParameter,
	IntParameter,
	BooleanParameter,
	DropdownParameter,
	FlagParameter,
	AnyParameter,
};
