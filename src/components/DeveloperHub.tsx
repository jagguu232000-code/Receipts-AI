import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  UserPlus, 
  Clock, 
  FileSpreadsheet, 
  Send, 
  RefreshCw, 
  Check, 
  Mail, 
  Database, 
  CheckCircle,
  Activity
} from "lucide-react";

interface DatabaseLog {
  users: {
    fullName: string;
    email: string;
    phone?: string;
    authProvider: string;
    avatarUrl?: string;
    signupTimestamp?: string;
  }[];
  activities: {
    userEmail: string;
    userName: string;
    action: string;
    details: string;
    timestamp: string;
  }[];
}

export default function DeveloperHub() {
  const [data, setData] = useState<DatabaseLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [copiedStatus, setCopiedStatus] = useState(false);

  const fetchDeveloperLogs = () => {
    setLoading(true);
    setErrorStatus(null);
    fetch("/api/developers/logs")
      .then((res) => {
        if (!res.ok) throw new Error("Developer log route did not respond. Check backend configurations.");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setErrorStatus(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDeveloperLogs();
  }, []);

  const handleExportSheets = () => {
    // Trigger of direct CSV file download path
    window.location.href = "/api/developers/export-sheets";
  };

  const totalUsers = data?.users?.length || 0;
  const totalActivities = data?.activities?.length || 0;

  return (
    <div className="w-full space-y-8 animate-fade-in">
      
      {/* DB TOP BANNER INFO */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl p-6 shadow-md border border-slate-800 relative overflow-hidden">
        <div className="absolute right-[-20px] top-[-20px] w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-indigo-500 text-white rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                Receipts AI Developer Console <span className="text-[10px] bg-indigo-600 px-2 py-0.5 rounded uppercase tracking-wider font-mono font-bold">Admin Active</span>
              </h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Inspect user registrations securely, monitor real-time copy generation activities, and synchronize SMTP notifications. Extract database contents directly to Microsoft Excel or Google Sheets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchDeveloperLogs}
              className="px-3.5 py-2 hover:bg-slate-800 border border-slate-700 bg-slate-900 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Metrics</span>
            </button>

            <button
              onClick={handleExportSheets}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-100" />
              <span>Export Sheets (.CSV)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ADMIN METRICS DASHBOARD */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-wider font-extrabold text-slate-400 uppercase">Total User Registrations</span>
            <p className="text-3xl font-black text-slate-900 mt-1">{totalUsers}</p>
            <p className="text-xs text-slate-500 mt-1">Google OAuth + Manual filled keys</p>
          </div>
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
            <UserPlus className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-wider font-extrabold text-slate-400 uppercase">Backend Action Activity</span>
            <p className="text-3xl font-black text-slate-900 mt-1">{totalActivities}</p>
            <p className="text-xs text-slate-500 mt-1">Total dynamic requests recorded</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-indigo-500">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-wider font-extrabold text-slate-400 uppercase">SMTP Dispacher Status</span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-extrabold text-emerald-700">SMTP Active</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Dispatches alerts on each sign-up</p>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600">
            <Mail className="w-6 h-6" />
          </div>
        </div>

      </section>

      {/* CORE LOGS PANEL */}
      {loading ? (
        <div className="p-16 border border-slate-200 bg-white rounded-xl text-center space-y-2 select-none text-slate-500">
          <RefreshCw className="w-8 h-8 animate-spin text-indigo-500 mx-auto" />
          <p className="text-xs font-bold text-slate-700 uppercase">Acquiring administrative credentials logs...</p>
        </div>
      ) : errorStatus ? (
        <div className="p-8 bg-rose-50 border border-rose-100 rounded-xl text-center text-rose-600">
          <p className="text-xs font-bold">Error loading developer logs:</p>
          <p className="text-xs font-mono mt-1">{errorStatus}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Registered Users Table (Left 7 Columns) */}
          <section className="bg-white border border-slate-300 rounded-xl p-5 md:p-6 shadow-sm col-span-1 lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-600 flex items-center gap-1.5 font-mono">
                💼 User Registrations Directory ({totalUsers})
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Persistence stored inside JSON</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-mono uppercase text-[9px] font-bold">
                    <th className="pb-2">User Details</th>
                    <th className="pb-2">Auth Method</th>
                    <th className="pb-2">Phone Number</th>
                    <th className="pb-2 text-right">Signed Up</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {data?.users && data.users.length > 0 ? (
                    data.users.map((user, idx) => (
                      <tr key={`user-${idx}`} className="hover:bg-slate-50/50">
                        <td className="py-2.5">
                          <div className="flex items-center gap-2">
                            {user.avatarUrl ? (
                              <img src={user.avatarUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[8px] font-bold uppercase text-indigo-650 text-indigo-600">
                                {(user.fullName || "JD").substring(0, 2)}
                              </div>
                            )}
                            <div>
                              <p className="font-bold text-slate-800">{user.fullName}</p>
                              <p className="text-[10px] text-slate-450">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold font-mono uppercase ${
                            user.authProvider === "google" 
                              ? "bg-blue-50 border border-blue-200 text-blue-705" 
                              : "bg-slate-100 text-slate-650"
                          }`}>
                            {user.authProvider}
                          </span>
                        </td>
                        <td className="py-2.5 text-slate-600 text-[10px] font-mono">
                          {user.phone || "Not specified"}
                        </td>
                        <td className="py-2.5 text-right text-slate-400 text-[10px] font-mono font-bold">
                          {user.signupTimestamp 
                            ? new Date(user.signupTimestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }) 
                            : "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400 italic">No registrations logged in workspace yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Activity Logs Stack (Right 5 Columns) */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm col-span-1 lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-600 flex items-center gap-1.5 font-mono">
                ⚡ Real-time User Activity Stream ({totalActivities})
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {data?.activities && data.activities.length > 0 ? (
                data.activities.slice(0, 30).map((act, idx) => (
                  <div key={`act-${idx}`} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] leading-relaxed relative flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[9px] font-mono font-bold text-indigo-650 text-indigo-600 uppercase border-b border-slate-200/50 pb-1 mb-1">
                      <span>{act.action}</span>
                      <span className="text-slate-400 font-extrabold">
                        {act.timestamp ? new Date(act.timestamp).toLocaleTimeString() : "N/A"}
                      </span>
                    </div>
                    <p className="text-slate-800 font-bold">
                      {act.userName} <span className="font-normal text-slate-400">({act.userEmail})</span>
                    </p>
                    <p className="text-slate-505 text-slate-500 bg-white border border-slate-150 rounded p-1.5 mt-0.5 select-all font-mono leading-tight">
                      {act.details}
                    </p>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-slate-400 italic">No user activity captured yet.</div>
              )}
            </div>
          </section>

        </div>
      )}

    </div>
  );
}
