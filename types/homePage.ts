import { IProduct } from "./common"

export interface IMainPageSectionProps {
	title: string
	goods: IProduct[]
	isLoading: boolean
}