"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

function Avatar({ first, last }){
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-900 text-sm font-semibold">
      {(first?.[0]||"?")+(last?.[0]||"")}
    </div>
  );
}

export default function BrowseStudents(){
  const [students, setStudents] = useState([]);
  useEffect(()=>{
    fetch("/api/students").then(r=>r.json()).then(d=>setStudents((d.students||[]).slice(0,6)));
  },[]);
  return (
    <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {students.map(s => (
        <div key={s.id} className="rounded-2xl border bg-white p-4">
          <div className="flex items-center gap-3">
            <Avatar first={s.firstName} last={s.lastName} />
            <div className="min-w-0">
              <div className="font-medium">{s.shareName? `${s.firstName} ${s.lastName}`:"Anonymous Student"}</div>
              <div className="text-xs text-gray-500">{s.school} • {s.major}</div>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-700 line-clamp-2">{s.story}</div>
          <div className="mt-3"><Link href={`/s/${s.id}`} className="inline-flex items-center justify-center rounded-lg px-3 py-1 text-sm font-medium border text-indigo-800 border-indigo-100 hover:bg-indigo-50">View profile</Link></div>
        </div>
      ))}
    </div>
  );
}