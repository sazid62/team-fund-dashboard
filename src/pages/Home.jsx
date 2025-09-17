import React, { useState } from "react";
import Card from "../components/Card.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { MONTHS, formatBDT ,formatBDNumber } from "../utils/demoData.js";
import { exportSummaryCSV } from "../utils/csv.js";
import { 
  CreditCard, 
  BarChart3, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar, 
  Target, 
  PieChart,
  Download,
  Printer,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Clock,
  Wallet,
  Activity,
  AlertCircle,
  Check
} from "lucide-react";
import DocumentTab from "../components/DocumentTab.jsx";

export default function Home({ contributionsJson }) {
  const target = 5000 * 21 * 24;
  const [currentMonthStart, currentMonthEnd] = [
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0],
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split("T")[0],
  ];

  const collected = contributionsJson.reduce((sum, r) => sum + (r.amount || 0), 0);
  const paidMemberCount = new Set(
    contributionsJson
      .filter((r) => r.date >= currentMonthStart && r.date <= currentMonthEnd)
      .map((r) => r.sender)
  ).size;

  const pct = Math.min(100, Math.round((collected / target) * 100));
  const remainingAmount = target - collected;
  const monthlyTarget = 5000 * 21;
  const currentMonthCollection = contributionsJson
    .filter((r) => r.date >= currentMonthStart && r.date <= currentMonthEnd)
    .reduce((sum, r) => sum + (r.amount || 0), 0);

  // পরবর্তী পেমেন্টের তারিখ ও রিমাইন্ডার
  const today = new Date();
  const currentMonthPaymentDay = new Date(today.getFullYear(), today.getMonth(), 10);
  let nextPaymentDate;
  if (today <= currentMonthPaymentDay) {
    nextPaymentDate = currentMonthPaymentDay;
  } else {
    nextPaymentDate = new Date(today.getFullYear(), today.getMonth() + 1, 10);
  }

  const remainingDays = Math.ceil((nextPaymentDate - today) / (1000 * 60 * 60 * 24));

  // States
  const [showPDF, setShowPDF] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 p-6">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
           
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">স্বপ্নচারী টুয়েন্টি গ্রুপ</h1>
                <p className="text-xl opacity-90">আমাদের স্বপ্নের যাত্রা, একসাথে এগিয়ে চলা</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-3xl font-bold mb-1">{formatBDT(collected)}</div>
                <div className="text-sm opacity-80">মোট সংগ্রহ</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-3xl font-bold mb-1">{formatBDNumber(pct)}%</div>
                <div className="text-sm opacity-80">লক্ষ্য অর্জন</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-3xl font-bold mb-1">{formatBDNumber(paidMemberCount)}/{formatBDNumber(21)}</div>
                <div className="text-sm opacity-80">সদস্য পেইড</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-2">
          <div className="flex  flex-wrap gap-4">
            {[
              { id: 'overview', label: 'সংক্ষিপ্ত বিবরণ', icon: BarChart3 },
              { id: 'documents', label: 'ডকুমেন্ট', icon: FileText }
            ].map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <IconComponent size={16} />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              );
            })
          }
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="m-2 grid lg:grid-cols-2 gap-8">
          {/* Stats Cards */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center text-white">
                  <Wallet size={16} />
                </span>
                আর্থিক অবস্থা
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <span className="text-gray-600 dark:text-gray-300">মোট লক্ষ্য</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{formatBDT(target)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <span className="text-gray-600 dark:text-gray-300">সংগ্রহকৃত</span>
                  <span className="font-bold text-lg text-green-600">{formatBDT(collected)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <span className="text-gray-600 dark:text-gray-300">বাকি আছে</span>
                  <span className="font-bold text-lg text-orange-600">{formatBDT(remainingAmount)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
          
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {nextPaymentDate.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="text-gray-600 dark:text-gray-300 mb-4">পরবর্তী পেমেন্টের তারিখ</div>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  remainingDays <= 3 ? 'bg-red-100 text-red-800' : remainingDays <= 7 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {remainingDays} দিন বাকি
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                  <TrendingUp size={16} />
                </span>
                অগ্রগতির চার্ট
              </h3>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">সামগ্রিক অগ্রগতি</span>
                  <span className="font-bold text-indigo-600">{pct}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all duration-1000 relative overflow-hidden"
                    style={{ width: `${pct}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Members Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 mb-1">{paidMemberCount}</div>
                  <div className="text-sm text-green-600 dark:text-green-400">পেমেন্ট সম্পন্ন</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600 mb-1">{21 - paidMemberCount}</div>
                  <div className="text-sm text-orange-600 dark:text-orange-400">বকেয়া আছে</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
              <h3 className="   text-2xl font-bold mb-4   e flex items-center gap-2">
               <span className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                  <CheckCircle size={16} />
                </span>  এই মাসের অবস্থা
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">মাসিক লক্ষ্য</span>
                  <span className="font-bold">{formatBDT(monthlyTarget)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">এই মাসে সংগ্রহ</span>
                  <span className="font-bold text-green-600">{formatBDT(currentMonthCollection)}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(100, (currentMonthCollection / monthlyTarget) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

   

      {activeTab === 'documents' && (
      <DocumentTab/>
      )}
    </div>
  </div>

    );
  }
