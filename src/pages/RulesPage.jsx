import Card from "../components/Card.jsx";
import { resetData } from "../utils/storage.js";

export default function RulesPage({ state, setState }) {
  function onPrint() {
    window.print();
  }
  function onReset() {
    if (confirm("সমস্ত ডেমো ডাটা রিসেট হবে। চালিয়ে যাবেন?")) {
      setState(resetData());
    }
  }
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={onPrint}>প্রিন্ট / PDF</button>
        <button className="btn btn-warn" onClick={onReset}>ডেমো ডাটা রিসেট</button>
      </div>

  

    </div>
  );
}
