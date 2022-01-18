export interface IReqResponse {
	data: IApiResponse
}

export interface IApiResponse {
	success: boolean,
	count: number,
	data?: object,
	paginator?: object
	// 메세지
	message: string,
	// HttpStatus 상태
	status?: number
	// HttpStatus name
	error?: string
	code?: string
}