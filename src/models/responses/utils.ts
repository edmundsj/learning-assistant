import {Response} from "@/hooks";
import {sort} from "next/dist/build/webpack/loaders/css-loader/src/utils";

const DAY_TO_MS = 60 * 60 * 24 * 1000
export function calculateInterval(response: Response, priorResponses:Response[]) {
  const multiplier = 1.5

  const sortedResponses = priorResponses.sort(resp => {
    return new Date(resp.created_at ?? 0).getTime()
  })
  if (sortedResponses.length === 0) {
    return DAY_TO_MS
  } else if (sortedResponses.length === 1) {
    return 4 * DAY_TO_MS
  } else {
    const lastResponse = sortedResponses[sortedResponses.length - 1]
    const lastInterval = lastResponse.next_interval_ms
    return lastInterval * multiplier * response.ease_level
  }
}

export function generateResponse(priorResponses: Response[]) {
}