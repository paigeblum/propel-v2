
"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

function Avatar({ firstName, lastName }) {
  const a = (firstName?.[0] || "?") + (lastName?.[0] || "");
  return <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-900 font-semibold">{a}</div>;
}

export default function Page(){
  const [students, setStudents] = useState([]);
  const [q, setQ] = useState("");
  const [visible, setVisible] = useState(24);

  useEffect(()=>{ fetch("/api/students").then(r=>r.json()).then(d=>setStudents(d.students||[])); },[]);

  const filtered = useMemo(()=>{
    const t = q.trim().toLowerCase();
    if(!t) return students;
    return students.filter(s => [`${s.firstName} ${s.lastName}`, s.school, s.major, s.passcode].some(x => String(x||"").toLowerCase().includes(t)));
  },[q, students]);

  const shown = filtered.slice(0, visible);

  return (
    <div className="container-narrow py-8">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Students</h2>
          <p className="mt-1 text-gray-600">Browse our current students. Search by name, school, major, or pass-code.</p>
        </div>
        <div className="w-full max-w-md">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search students…"
                 className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map(s => <Card key={s.id} s={s} />)}
      </div>

      {shown.length < filtered.length && (
        <div className="mt-6 flex justify-center">
          <button onClick={()=>setVisible(v=>v+24)} className="btn btn-subtle">Load more</button>
        </div>
      )}

      {filtered.length===0 && <div className="text-sm text-gray-500 mt-4">No students match your search.</div>}
    </div>
  );
}

function Card({ s }){
  const display = s.shareName ? `${s.firstName} ${s.lastName}` : "Anonymous Student";
  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden p-4">
      <div className="flex items-start gap-3">
        <Avatar firstName={s.firstName} lastName={s.lastName} />
        <div className="min-w-0 flex-1">
          <div className="font-semibold">{display}</div>
          <div className="text-xs text-gray-500">{s.school} • {s.major}</div>
          <div className="mt-2 text-sm text-gray-700 line-clamp-3">{s.story}</div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
            <div><div className="text-gray-500">Raised</div><div className="font-medium">${s.raised.toLocaleString()}</div></div>
            <div><div className="text-gray-500">Remaining</div><div className="font-medium">${s.remainingBalance.toLocaleString()}</div></div>
            <div><div className="text-gray-500">Payments</div><div className="font-medium">{s.paymentsRemaining}</div></div>
          </div>
          <div className="mt-3"><Link href={`/s/${s.id}`} className="inline-flex items-center justify-center rounded-lg px-3 py-1 text-sm font-medium border text-indigo-800 border-indigo-100 hover:bg-indigo-50">View profile</Link></div>
          <div className="mt-2 text-xs text-gray-500">Pass-code: <span className="font-medium">{s.passcode}</span></div>
        </div>
      </div>
    </div>
  );
}
