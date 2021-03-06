import callWebApi from './webApi.service';
import { v4 as uuid } from 'uuid';

export const getUser = async () => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: '/api/auth/user'
	});
	return res;
};

export const updateEmail = async (userId: string, email: string) => {
	const token = uuid();
	const body = { email, token };

	const res = await callWebApi({
		method: 'PUT',
		endpoint: `/api/user/email/${userId}`,
		body
	});
	return res;
};

export const updatePassword = async (userId: string, password: string) => {
	const token = uuid();
	const body = { password, token };
	const res = await callWebApi({
		method: 'PUT',
		endpoint: `/api/user/password/${userId}`,
		body
	});
	return res;
};

export const deleteUser = async (userId: string) => {
	const res = await callWebApi({
		method: 'DELETE',
		endpoint: `/api/user/${userId}`
	});
	return res;
};

export const updateNotificationSettings = async (
	userId: string,
	data: object
) => {
	const body = data;
	const res = await callWebApi({
		method: 'PUT',
		endpoint: `/api/user/notifications/${userId}`,
		body
	});
	return res;
};

export const updatePrivacySettings = async (userId: string, data: object) => {
	const body = data;
	const res = await callWebApi({
		method: 'PUT',
		endpoint: `/api/user/privacy/${userId}`,
		body
	});
	return res;
};
