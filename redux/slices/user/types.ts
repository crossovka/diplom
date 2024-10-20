export interface IUser {
	_id: string
	name: string
	password: string
	email: string
	image: string
	role: string
}

export interface UserState {
	user: IUser;
	userGeolocation: IUserGeolocation;
	loading: boolean;
  error: string | null;
}

export interface IUserGeolocation {
	features: [
		{
			properties: {
				city: string
				lon: number
				lat: number
			}
			bbox: [number, number, number, number]
		},
	]
}

export interface IGetGeolocation {
	lat: number
	lon: number
}

export interface ILoginCheck {
	jwt: string
	setShouldShowContent?: (arg0: boolean) => void
}