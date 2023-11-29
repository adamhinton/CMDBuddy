import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CMDBuddyCommand, CommandSchema } from "../../utils/zod/CommandSchema";

const CommandCreationForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CMDBuddyCommand>({
		resolver: zodResolver(
			CommandSchema.omit({
				id: true,
				order: true,
				userID: true,
				parameters: true,
			})
		),
	});

	const onSubmit = (data: CMDBuddyCommand) => {
		console.log(data);
		// Handle command creation logic here
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="baseCommand">Base Command</label>
				<input {...register("baseCommand")} />
				{errors.baseCommand && <p>{errors.baseCommand.message}</p>}
			</div>

			<div>
				<label htmlFor="title">Title</label>
				<input {...register("title")} />
				{errors.title && <p>{errors.title.message}</p>}
			</div>

			<input type="submit" value="Create Command" />
		</form>
	);
};

export default CommandCreationForm;
