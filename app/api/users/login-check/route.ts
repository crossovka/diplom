import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import {
	getAuthRouteData,
	findUserByEmail,
	parseJwt,
} from '@/lib/utils/api-routes'
import { IUser } from '@/redux/slices/user/types'

export async function GET(req: Request) {
	try {
		const { db, validatedTokenResult, token } = await getAuthRouteData(
			clientPromise,
			req,
			false
		)

		if (validatedTokenResult.status !== 200) {
			return NextResponse.json(validatedTokenResult)
		}

		const user = (await findUserByEmail(
			db,
			parseJwt(token as string).email
		)) as unknown as IUser

		return NextResponse.json({
			status: 200,
			message: 'token is valid',
			user: {
				email: user.email,
				name: user.name,
				_id: user?._id,
				image: user.image,
			},
		})
	} catch (error) {
		throw new Error((error as Error).message)
	}
}
// указывает на то, что страница должна быть отрендерена динамически на сервере,
// а не статически на этапе сборки.
export const dynamic = 'force-dynamic'
