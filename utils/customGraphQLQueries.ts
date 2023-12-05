// Gets Commands by userID along with Commands' Parameters
export const customCommandsAndParametersByUserID = /* GraphQL */ `
	query CommandsByUserID($userID: ID!) {
		commandsByUserID(userID: $userID) {
			items {
				id
				baseCommand
				title
				order
				userID
				parameters {
					items {
						id
						type
						defaultValue
						name
						order
						validationRegex
						minLength
						maxLength
						minValue
						maxValue
						isNullable
						allowedValues
					}
					nextToken
				}
			}
			nextToken
		}
	}
`;

export const customUserByEmail = /* GraphQL */ `
	query UserByEmail($email: String!) {
		userByEmail(email: $email) {
			items {
				id
				email
				darkMode
				commands {
					items {
						id
						baseCommand
						title
						order
						parameters {
							items {
								id
								type
								defaultValue
								name
								order
								validationRegex
								minLength
								maxLength
								minValue
								maxValue
								isNullable
								allowedValues
							}
							nextToken
						}
					}
					nextToken
				}
			}
			nextToken
		}
	}
`;

export const customGetCommandWithParameters = /* GraphQL */ `
	query GetCommandWithParameters($id: ID!) {
		getCommand(id: $id) {
			id
			baseCommand
			title
			order
			userID
			user {
				id
				email
				darkMode
				createdAt
				updatedAt
				__typename
			}
			parameters {
				items {
					commandID
					id
					type
					defaultValue
					name
					order
					validationRegex
					minLength
					maxLength
					minValue
					maxValue
					isNullable
					allowedValues
					__typename
				}
				nextToken
			}
			createdAt
			updatedAt
			__typename
		}
	}
`;
