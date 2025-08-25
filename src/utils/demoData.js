export const MONTHS = (() => {
  // 24-month window starting from Jan 2025 for demo
  const start = new Date(2025, 0, 1);
  const arr = [];
  for (let i = 0; i < 24; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    arr.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleString("bn-BD", { year: "numeric", month: "long" }),
    });
  }
  return arr;
})();

export function formatBDT(n) {
  console.log("formatBDT", n);
  return new Intl.NumberFormat("bn-BD").format(n) + " টাকা";
}
// utils/number.js
export function formatBDNumber(num) {
  if (num === null || num === undefined) return "";

  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  return String(num).replace(/[0-9]/g, (d) => bengaliDigits[d]);
}


export function formatBDDate(dateStr) {
  console.log("formatBDDate", dateStr);
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export const STORAGE_KEY = "team-fund-demo-v2";

const defaultMembers = [
  {
    id: 1,
    name: "মো: গালিব চৌধুরী",
    mobile: "০১৮৩৯৭৩১১০১",
    email: "galibch2@gmail.com",
    work: "কাজিরহাট",
    nominee: "সুকিলা আকতার",
    bank: "২১৩৯২১৩০২৪৪৭৩",
    nid: "",
    address: "আজিমপুর",
  },
];

for (let i = 2; i <= 21; i++) {
  defaultMembers.push({
    id: i,
    name: `সদস্য ${i}`,
    mobile: "",
    email: "",
    work: "",
    nominee: "",
    bank: "",
    nid: "",
    address: "",
  });
}

const defaultContrib = {};

MONTHS.forEach((m, idx) => {
  defaultContrib[m.key] = {};
  defaultMembers.forEach((mem) => {
    const paid = Math.random() < 0.85 - idx * 0.02;
    defaultContrib[m.key][mem.id] = paid;
  });
});

export const DEFAULT_STATE = {
  members: defaultMembers,
  contrib: defaultContrib,
};
