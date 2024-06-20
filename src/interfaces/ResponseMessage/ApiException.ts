export interface ApiException {
  statusCode: number;
  message: string;
  path: string;
  timestamp: string;
}
