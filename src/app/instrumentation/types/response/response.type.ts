import { ErrorData } from './error-data.type';

interface ErrorResponse<TError extends ErrorData> {
  data: null;
  error: TError;
}

interface DataResponse<TData> {
  data: TData;
  error: null;
}

export type Response<TData, TError extends ErrorData> = DataResponse<TData> | ErrorResponse<TError>;
