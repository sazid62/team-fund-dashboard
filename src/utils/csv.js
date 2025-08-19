export function downloadCSV(rows, filename) {
  const csv = rows.map((r) => r.map((x) => `"${String(x).replaceAll('"','""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export function exportSummaryCSV(state, monthKey) {
  const rows = [["Member", "Status", "Amount"]];
  state.members.forEach((m) => {
    const paid = state.contrib[monthKey]?.[m.id];
    rows.push([m.name, paid ? "Paid" : "Pending", paid ? "5000" : "0"]);
  });
  downloadCSV(rows, `summary-${monthKey}.csv`);
}
