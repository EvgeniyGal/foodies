import ctrlWrapper from "../decorators/ctrlWrapper.js";
import usersServices from "../services/usersServices.js";
import gravatar from 'gravatar';

const register = async (req, res) => {
	const { name, email, avatar, token } = await usersServices.register({
		...req.body,
		avatar: gravatar.url(req.body.email),
	});

	res.status(201).json({
		user: {
			name,
			email,
			avatar,
			token
		}
	});
};

export default {
	register: ctrlWrapper(register),
}
