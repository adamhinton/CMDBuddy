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
						length
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
								length
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
