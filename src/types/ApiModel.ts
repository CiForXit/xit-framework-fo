export interface IApiResponse<T> {
  success: boolean;
  count: number;
  data?: T;
  paginator?: object;
  // 메세지
  message: string;
  // HttpStatus 상태
  status?: number;
  // HttpStatus name
  error?: string;
  code?: string;
}
