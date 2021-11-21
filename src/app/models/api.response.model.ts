export interface IApiResponse {
    code: Number,
    error_code: String,
    message: String,
    _message: String,
    data: Object | null | ''
}