'use client';

import { selectUser } from '@/redux/slices/user/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/store';

import { useEffect } from 'react';

const ProfilePage: React.FC = () => {
	const dispatch = useAppDispatch();

	const user = useAppSelector(selectUser);
	
	useEffect(() => {
		console.log(user, 'user');
	}, [user]);

	if (!user || Object.keys(user).length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<main>
			<h1>ProfilePage</h1>
			<div>{user.name}</div>
			<div>{user.email}</div>
		</main>
	);
};

export default ProfilePage;
