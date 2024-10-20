import jwt, { VerifyErrors } from 'jsonwebtoken'
import clientPromise from '@/lib/mongodb'
import {
	getDbAndReqBody,
	findUserByEmail,
	parseJwt,
	generateTokens,
} from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { db, reqBody } = await getDbAndReqBody(clientPromise, req);

		// Сначала проверить есть ли jwt
		if (!reqBody?.jwt) {
			return NextResponse.json({
				message: 'jwt is required',
				status: 404,
			});
		}

		const refreshToken = reqBody.jwt;
		let accessToken = {};
		// refresh N access
		let tokens = {};
		let error = null;

		await jwt.verify(
			refreshToken,
			process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
			async (err: VerifyErrors | null) => {
				const user = await findUserByEmail(db, parseJwt(reqBody.jwt).email);

				if (!user) {
					error = { message: 'Invalid jwt token' };
					return;
				}

				// в loginCheck в консол лог это вернулось
				// 	{
				// 		"message": "Unauthorized",
				// 		"status": 401,
				// 		"error": {
				// 				"name": "TokenExpiredError",
				// 				"message": "jwt expired",
				// 				"expiredAt": "2024-10-19T11:28:34.000Z"
				// 		}
				// }
				if (err) {
					if (err.name === 'TokenExpiredError') {
						tokens = generateTokens(user.name, user.email);
					}

					error = err;
					return;
				}

				accessToken = jwt.sign(
					{
						name: user.name,
						email: user.email,
					},
					process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
					{
						expiresIn: '10m',
					}
				);
			}
		);

		// Если ошибка свзяанная с протуханием рефрешь токена, то оба новых токена возвращаются (refresh N access)
		if ((error as unknown as VerifyErrors)?.name === 'TokenExpiredError') {
			return NextResponse.json(tokens);
		}

		// ес другая ошибка
		if (error) {
			return NextResponse.json({
				message: 'Unauthorized',
				status: 401,
				error,
			});
		}

		// Если рефреш токен нормальынй и не протушхий, то возвращается существующий до этого рефреш токен и новый аксес токен
		// который протух и рефрешнулся
		return NextResponse.json({ accessToken, refreshToken });
	} catch (error) {
		throw new Error((error as Error).message);
	}
}

// export async function POST(req: Request) {
// 	try {
// 		const { db, reqBody } = await getDbAndReqBody(clientPromise, req)

// 		if (reqBody?.jwt) {
// 			const refreshToken = reqBody.jwt
// 			let accessToken = {}
// 			// refresh N access
// 			let tokens = {}
// 			let error = null

// 			await jwt.verify(
// 				refreshToken,
// 				process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
// 				async (err: VerifyErrors | null) => {
// 					const user = await findUserByEmail(db, parseJwt(reqBody.jwt).email)

// 					if (!user) {
// 						error = { message: 'Invalid jwt token' }
// 						return
// 					}

// 					if (err) {
// 						if (err.name === 'TokenExpiredError') {
// 							tokens = generateTokens(user.name, user.email)
// 						}

// 						error = err
// 						return
// 					}

// 					accessToken = jwt.sign(
// 						{
// 							name: user.name,
// 							email: user.email,
// 						},
// 						process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
// 						{
// 							expiresIn: '10m',
// 						}
// 					)
// 				}
// 			)

// 			if ((error as unknown as VerifyErrors)?.name === 'TokenExpiredError') {
// 				return NextResponse.json(tokens)
// 			}

// 			if (error) {
// 				return NextResponse.json({
// 					message: 'Unauthorized',
// 					status: 401,
// 					error,
// 				})
// 			}

// 			return NextResponse.json({ accessToken, refreshToken })
// 		} else {
// 			return NextResponse.json({
// 				message: 'jwt is required',
// 				status: 404,
// 			})
// 		}
// 	} catch (error) {
// 		throw new Error((error as Error).message)
// 	}
// }
