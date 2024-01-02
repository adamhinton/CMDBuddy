import { z } from "zod";
import { CommandSchema } from "./CommandSchema";

export const UserSchema = z.object({
	id: z.string().uuid(),
	email: z.string().email(),
	darkMode: z.boolean(),
	commands: z.array(CommandSchema).optional(),
	email_verified: z.boolean().optional(),
});

export type CMDBuddyUser = z.infer<typeof UserSchema>;
