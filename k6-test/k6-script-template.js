export function handleSummary(data) {
  return {
    "k6-test/summary.html": htmlReport(data),
  };
}
