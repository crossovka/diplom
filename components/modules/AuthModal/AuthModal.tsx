import { motion } from 'framer-motion';

import { useState } from 'react';
import { basePropsForMotion } from '@/constants/motion';

import AuthModalClose from './AuthModalClose';
import AuthModalRegistration from './AuthModalRegistration';
import AuthModalLogin from './AuthModalLogin.tsx';

const AuthModal = () => {
	const [isAuthSwitched, setIsAuthSwitched] = useState(false);
	const [isSignInActive, setIsSignInActive] = useState(false);
	const [isSignupActive, setIsSignupActive] = useState(true);

	const toggleAuth = () => {
		setIsAuthSwitched(!isAuthSwitched);
		setIsSignInActive(!isSignInActive);
		setIsSignupActive(!isSignupActive);
	};

	return (
		<motion.div
			{...basePropsForMotion}
			className={`modal auth-modal ${isAuthSwitched ? 'switched' : ''}`}
		>
			<AuthModalClose />
			<div className="auth-modal__inner">
				{isSignInActive && (
					<AuthModalRegistration toggleAuth={toggleAuth} isSideActive={isSignupActive}/>
				)}
				{isSignupActive && (
					<AuthModalLogin toggleAuth={toggleAuth} isSideActive={isSignInActive} />
				)}
			</div>
		</motion.div>
	);
};

export default AuthModal;
