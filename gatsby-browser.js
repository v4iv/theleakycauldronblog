import { reportWebVitals, sendToAnalytics } from './report-web-vitals'

export const onClientEntry = () => {
  reportWebVitals(sendToAnalytics)
}
