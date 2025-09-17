import { Image } from "antd";
import {
  Eye,
  Download,
  FileText,
  Calendar,
  Printer,
} from "lucide-react";
import React, { useState, useEffect } from "react";

const DocumentTab = () => {
  const [documents, setDocuments] = useState([]);

  const monthNamesBangla = {
    january: "জানুয়ারি",
    february: "ফেব্রুয়ারি",
    march: "মার্চ",
    april: "এপ্রিল",
    may: "মে",
    june: "জুন",
    july: "জুলাই",
    august: "আগস্ট",
    september: "সেপ্টেম্বর",
    october: "অক্টোবর",
    november: "নভেম্বর",
    december: "ডিসেম্বর",
  };

  const getBanglaName = (filename) => {
    const name = filename.replace(/\.(png|jpg|jpeg|pdf)$/i, "");
    const [month, year] = name.split("_");
    const banglaMonth = monthNamesBangla[month?.toLowerCase()] || month;
    return `${banglaMonth} ${year} - পেইড স্লিপ`;
  };

  useEffect(() => {
    const knownDocuments = ["september_25.png"];
    const existingDocs = knownDocuments.map((filename) => ({
      filename,
      path: `/paidSlip/${filename}`,
      banglaName: getBanglaName(filename),
      type: filename.endsWith(".pdf") ? "pdf" : "image",
    }));
    setDocuments(existingDocs);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="space-y-10">
        {/* Paid Slips */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 p-6 rounded-2xl shadow-lg">
          <header className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              পেইড স্লিপ সমূহ
            </h2>
          </header>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            নিচে বিভিন্ন মাসের পেইড স্লিপ দেখুন। প্রতিটি ডকুমেন্ট প্রমাণস্বরূপ সংরক্ষিত আছে।
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, idx) => (
      <div className="max-w-sm w-full mx-auto bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
  <div className="bg-emerald-500 text-white text-center py-3 px-4 font-semibold text-sm sm:text-base">
    <h2>{doc.banglaName}</h2>
  </div>

  <div className="p-4">
    <Image
      src={doc.path}
      alt={doc.banglaName}
      className="w-full h-auto rounded-md object-cover"
    />
  </div>
</div>

            ))}
          </div>

          {documents.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <FileText size={48} className="mx-auto mb-4" />
              কোনো পেইড স্লিপ পাওয়া যায়নি।
            </div>
          )}
        </section>

        {/* Rules PDF */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 p-6 rounded-2xl shadow-lg">
          <header className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              নিয়মাবলী PDF
            </h2>
          </header>

          <div className="relative rounded-2xl overflow-hidden border dark:border-slate-600 bg-white dark:bg-slate-700 shadow">
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-600 dark:to-slate-500 flex items-center justify-between px-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
              <span className="truncate w-full text-center">
                স্বপ্নচারী টুয়েন্টি গ্রুপ - নিয়মাবলী.pdf
              </span>
            </div>
            <div className="pt-10 h-[500px]">
              <iframe
                src="rules.pdf#toolbar=1"
                className="w-full h-full border-0"
                title="নিয়মাবলী"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a
              href="/rules.pdf"
              download="স্বপ্নচারী-টুয়েন্টি-গ্রুপ-নিয়মাবলী.pdf"
              className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow hover:shadow-lg"
            >
              <Download size={18} />
              ডাউনলোড
            </a>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow hover:shadow-lg"
            >
              <Printer size={18} />
              প্রিন্ট করুন
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocumentTab;
