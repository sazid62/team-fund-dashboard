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

      <Card>
        <h3 className="text-slate-400 text-sm font-semibold mb-2">শর্তাবলী</h3>
        <ol className="list-decimal list-inside leading-7">
          <li>আমি সবার সিদ্ধান্তে একমত পোষণ করিব।</li>
          <li>কোন নিয়ম বহির্ভূত কাজ করিব না।</li>
          <li>প্রতি মাসের ১০ তারিখের ভিতর টাকা জমা দিব এবং ২ বছর শেষ হওয়ার আগে কোন টাকা তুলিব না।</li>
          <li>আমি নিজে সবসময় চেষ্টা করিব যাতে প্রতিষ্ঠান সবার জন্য মঙ্গল ও আশীর্বাদ হয়ে দাঁড়ায়।</li>
          <li>প্রতিষ্ঠান-বিরোধী কাজ করলে সদস্যপদ বাতিল হতে পারে; তাতে কোন আইনি ব্যবস্থা নিব না।</li>
        </ol>
        <p className="text-slate-400 text-sm mt-2">
          উপরোক্ত নিয়মাবলী ডেমো কনটেন্ট হিসেবে যুক্ত — আপনারা ইচ্ছামত সম্পাদনা করতে পারবেন।
        </p>
      </Card>

      <Card>
        <h3 className="text-slate-400 text-sm font-semibold mb-2">আবেদনকারীর উদাহরণ (প্রোফাইল ডেটা)</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <ul className="leading-7">
            <li>নাম: মো: গালিব চৌধুরী</li>
            <li>পিতা: মহিম উদ্দিন চৌধুরী</li>
            <li>মাতা: সুকিলা আকতার</li>
            <li>গ্রাম: আজিমপুর</li>
            <li>জন্মতারিখ: ২৯-০১-২০০১</li>
            <li>মোবাইল: ০১৮৩৯৭৩১১০১</li>
          </ul>
          <ul className="leading-7">
            <li>Bank একাউন্ট: ২১৩৯২১৩০২৪৪৭৩</li>
            <li>NID নাম্বার: —</li>
            <li>কর্মস্থল: কাজিরহাট</li>
            <li>নমিনির নাম: সুকিলা আকতার</li>
            <li>ইমেইল: galibch2@gmail.com</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
