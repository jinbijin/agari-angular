import { ErrorData } from './error-data.type';

interface ErrorResponse<TError extends ErrorData> {
  error: TError;
}

interface DataResponse<TData> {
  data: TData;
}

export type Response<TData, TError extends ErrorData> = DataResponse<TData> | ErrorResponse<TError>;
