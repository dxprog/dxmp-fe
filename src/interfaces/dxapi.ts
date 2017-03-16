interface Metrics {
  timestamp: Number,
  gen_time: Number
}

interface Status {
  method: String,
  ret_code: Number,
  message: String
}

export interface DxApiResponse {
  metrics: Metrics,
  status: Status,
  body: any
}