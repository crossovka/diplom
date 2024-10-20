import { AppDispatch } from "../store";
import { refreshToken } from "./auth/asyncActions";
import { loginCheck } from "./user/asyncActions";

export enum JWTError {
	INVALID_JWT_TOKEN = 'JsonWebTokenError',
	EXPIRED_JWT_TOKEN = 'TokenExpiredError',
}

export const handleJWTError = async (
	errorName: string,
	dispatch: AppDispatch, // Accept dispatch here
	repeatRequestAfterRefreshData?: {
		repeatRequestMethodName: string;
		payload?: unknown;
	}
) => {
	if (errorName === JWTError.EXPIRED_JWT_TOKEN) {
		const auth = JSON.parse(localStorage.getItem('auth') as string);
		const result = await dispatch(refreshToken({ jwt: auth.refreshToken }));

		if (result.meta.requestStatus === 'fulfilled') {
			const newTokens = result.payload; // Assuming this returns new tokens
			const { accessToken } = newTokens;

			if (repeatRequestAfterRefreshData) {
				const { repeatRequestMethodName, payload } = repeatRequestAfterRefreshData;

				switch (repeatRequestMethodName) {
					case 'loginCheck':
						return await loginCheck({ jwt: accessToken });
					// case 'addProductToComparisonFx':
					// 	return addProductToComparisonFx({
					// 		...(payload as IAddProductToComparisonFx),
					// 		jwt: accessToken,
					// 	});
					// Handle other cases similarly
				}
			}
		}
	}
};
