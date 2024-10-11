export interface IProduct {
	_id: string
	type: string
	category: string
	collection: string
	price: number
	name: string
	description: string
	// TODO динамический потмоу что много характеристик и не стоит наверное все описывать?
	characteristics: { [index: string]: string }
	images: string[]
	vendorCode: string
	inStock: string
	isBestseller: boolean
	isNew: boolean
	sizes: ISizes
	popularity: number
	errorMessage?: string
}

// const allowedCompositions = ['cotton', 'synthetics', 'polyester'];

export interface IGetGeolocation {
	lat: number
	lon: number
}