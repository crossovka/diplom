import { Db, MongoClient, ObjectId } from 'mongodb'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { shuffle } from './common'
// import { NextResponse } from 'next/server'

export const getDbAndReqBody = async (
	clientPromise: Promise<MongoClient>,
	req: Request | null
) => {
	const db = (await clientPromise).db(process.env.NEXT_PUBLIC_DB_NAME)

	if (req) {
		const reqBody = await req.json()
		return { db, reqBody }
	}

	return { db }
}

export const getNewAndBestsellerGoods = async (db: Db, fieldName: string) => {
	const clothes = await db.collection('cloth').find().toArray()
	const accessories = await db.collection('accessories').find().toArray()

	return shuffle([
		...clothes
			.filter(
				(item) =>
					item[fieldName] && Object.values(item.sizes).some((value) => value)
			)
			.slice(0, 2),
		...accessories
			.filter((item) => item[fieldName] && !Object.values(item.sizes).length)
			.slice(0, 2),
	])
}

/**
 * Generates an access token and a refresh token
 * @param {string} name The user's name
 * @param {string} email The user's email
 * @returns {{accessToken: string, refreshToken: string}} Tokens
 */
export const generateTokens = (name: string, email: string): { accessToken: string; refreshToken: string } => {
	const accessToken = jwt.sign(
		{
			name,
			email,
		},
		process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
		{
			// expiresIn: '0.1m',
			expiresIn: '10m',
		}
	)

	const refreshToken = jwt.sign(
		{
			email,
		},
		process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
		{ expiresIn: '30d' }
	)

	return { accessToken, refreshToken }
}

/**
 * Creates a user in the database and generates an access token and a refresh token.
 * @param {Db} db Инстанс дб для обращения к MongoDB database
 * @param {{name: string, password: string, email: string}} reqBody The request body
 * @returns {{accessToken: string, refreshToken: string}} Tokens
 */
export const createUserAndGenerateTokens = async (
	db: Db,
	{ name, password, email }: { name: string; password: string; email: string }
) => {
	const salt = bcrypt.genSaltSync(10)
	const hash = bcrypt.hashSync(password, salt)

	// TODO потом адреса промокоды и прочее добавить
	await db.collection('users').insertOne({
		name,
		// Пароль в хэшированном виде хранится в БД
		password: hash,
		email,
		image: '',
		role: 'user',
	})

	return generateTokens(name, email)
}

// подразумевается что емэйл уникальный возвращает {user} | null
export const findUserByEmail = async (db: Db, email: string) => db.collection('users').findOne({ email })

export const isValidAccessToken = async (token: string | undefined) => {
	const baseError = {
		message: 'Unauthorized',
		status: 401,
	}
	let jwtError = null

	if (!token) {
		return {
			...baseError,
			error: { message: 'jwt is required' },
		}
	}

	// jwt.verify(
	await jwt.verify(
		token,
		process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
		async (err: VerifyErrors | null) => {
			if (err) {
				jwtError = err
			}
		}
	)

	if (jwtError) {
		return {
			...baseError,
			error: jwtError,
		}
	}

	return { status: 200 }
}

export const parseJwt = (token: string) => JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

export const getAuthRouteData = async (
	clientPromise: Promise<MongoClient>,
	req: Request,
	withReqBody = true
) => {
	const { db, reqBody } = await getDbAndReqBody(
		clientPromise,
		withReqBody ? req : null
	)
	const token = req.headers.get('authorization')?.split(' ')[1]
	const validatedTokenResult = await isValidAccessToken(token)

	return { db, reqBody, validatedTokenResult, token }
}