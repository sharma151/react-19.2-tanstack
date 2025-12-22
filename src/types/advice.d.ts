export interface AdviceSlip {
  id: number;
  advice: string;
}

export interface AdviceResponse {
  slip: AdviceSlip;
}

export interface SearchResponse {
  total_results: string;
  query: string;
  slips: AdviceSlip[];
}
