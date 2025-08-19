import { DEFAULT_STATE, STORAGE_KEY } from "./demoData.js";

export { STORAGE_KEY } from "./demoData.js";

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    return JSON.parse(raw);
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetData() {
  localStorage.removeItem(STORAGE_KEY);
  return loadState();
}

export function updateMember(prev, member) {
  const copy = structuredClone(prev);
  const idx = copy.members.findIndex((x) => x.id === member.id);
  if (idx === -1) return prev;
  copy.members[idx] = { ...copy.members[idx], ...member };
  return copy;
}

export function addMember(prevState, partial) {
  const prev = structuredClone(prevState);
  const id = Math.max(...prev.members.map((m) => m.id)) + 1;
  const m = {
    id,
    name: partial.name || `নতুন সদস্য ${id}`,
    mobile: partial.mobile || "",
    email: partial.email || "",
    work: partial.work || "",
    nominee: partial.nominee || "",
    bank: partial.bank || "",
    nid: partial.nid || "",
    address: partial.address || "",
  };
  prev.members.push(m);
  Object.keys(prev.contrib).forEach((k) => {
    prev.contrib[k][id] = false;
  });
  return prev;
}

export function removeMember(prev, id) {
  const copy = structuredClone(prev);
  copy.members = copy.members.filter((x) => x.id !== id);
  Object.keys(copy.contrib).forEach((k) => {
    delete copy.contrib[k][id];
  });
  return copy;
}
