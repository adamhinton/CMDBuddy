// README:
// Defining types and schemas for creation/editing of Commands and their Parameters

import { z } from "zod";
import { ParameterSchema } from "../zod/ParameterSchema";
ParameterSchema;

// This is elaborated on for each different kind of parameter
const ParameterCreationSchema = ParameterSchema.extend({
	// Making Order optional because we only add it on submit
	order: z.number().int().optional(),
	// id, commandID and hasBeenEdited are optional because it's only needed in "edit" mode
	id: z.string().uuid().optional(),
	commandID: z.string().uuid().optional(),
	// Lets onSubmit know that the param has/hasn't been changed and does/doesn't need to be updated
	// false by default
	hasBeenEdited: z.boolean().default(false).optional(),
});

// Subtypes for each parameter type
const StringParameterSchema = ParameterCreationSchema.pick({
	order: true,
	id: true,
	commandID: true,
	type: true,
	defaultValue: true,
	name: true,
	validationRegex: true,
	minLength: true,
	maxLength: true,
	isNullable: true,
	hasBeenEdited: true,
}).extend({
	type: z.literal("STRING"),
	isCollapsed: z.boolean().optional(),
});

const IntParameterSchema = ParameterCreationSchema.pick({
	order: true,
	id: true,
	commandID: true,
	type: true,
	defaultValue: true,
	name: true,
	minValue: true,
	maxValue: true,
	isNullable: true,
	hasBeenEdited: true,
}).extend({
	type: z.literal("INT"),
	isCollapsed: z.boolean().optional(),
});

const BooleanParameterSchema = ParameterCreationSchema.pick({
	order: true,
	id: true,
	commandID: true,
	type: true,
	defaultValue: true,
	name: true,
	isNullable: true,
	hasBeenEdited: true,
}).extend({
	type: z.literal("BOOLEAN"),
	isCollapsed: z.boolean().optional(),
});

const DropdownParameterSchema = ParameterCreationSchema.pick({
	order: true,
	id: true,
	commandID: true,
	type: true,
	defaultValue: true,
	name: true,
	allowedValues: true,
	isNullable: true,
	hasBeenEdited: true,
}).extend({
	type: z.literal("DROPDOWN"),
	isCollapsed: z.boolean().optional(),
});

const FlagParameterSchema = ParameterCreationSchema.pick({
	order: true,
	id: true,
	commandID: true,
	type: true,
	defaultValue: true,
	name: true,
	hasBeenEdited: true,
}).extend({
	type: z.literal("FLAG"),
	isCollapsed: z.boolean().default(false),
});

const AnyParameterSchema = z.union([
	StringParameterSchema,
	IntParameterSchema,
	BooleanParameterSchema,
	DropdownParameterSchema,
	FlagParameterSchema,
]);

export const CommandCreationZodSchemas = {
	StringParameterSchema,
	IntParameterSchema,
	BooleanParameterSchema,
	DropdownParameterSchema,
	FlagParameterSchema,
	AnyParameterSchema,
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
