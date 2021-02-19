export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}

export const sendToAnalytics = (metrics) => {
  const { id, delta, name, value } = metrics
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag({
      event: name,
      // Use the metric delta as the event's value parameter.
      value: delta,
      // Everything below is a custom event parameter.
      web_vitals_metric_id: id, // Needed to aggregate events.
      web_vitals_metric_name: name, // Needed to aggregate events.
      web_vitals_metric_value: value, // Optional
    })
    console.log('Reporting Web Vitals...')
  }
}
