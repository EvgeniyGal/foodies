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

const login = async (req, res) => {
	const user = await usersServices.login(req.body);
	const { name, email, avatar, token } = user;

	res.status(200).json({
		token,
		user: {
			name,
			email,
			avatar,
		}
	})
};

export default {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
}
