// app/donate/DonateClient.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function DonateClient() {
  const [tab, setTab] = useState("student");
  const [students, setStudents] = useState([]);
  const [funds, setFunds] = useState([]);
  const params = useSearchParams();
  const preselectId = params.get("student");

  useEffect(() => {
    fetch("/api/students").then(r => r.json()).then(d => setStudents(d.students || []));
    fetch("/api/schools").then(r => r.json()).then(d => setFunds(d.funds || []));
  }, []);

  return (
    <div className="container-narrow py-8">
      <h2 className="text-2xl font-semibold tracking-tight">Donate</h2>
      <div className="mt-2 text-gray-600">
        Give directly to a student or to a tax-deductible school fund. Funds route to loan servicers; students never handle money.
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {([["student","Find a Student"],["school","School Funds"]]).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={
              "rounded-xl border px-4 py-2 text-sm " +
              (tab === k ? "bg-indigo-50 border-indigo-200 text-indigo-800" : "hover:bg-gray-50")
            }
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "student" && (
        <GiveStudent
          students={students}
          preselectId={preselectId}
          onDonate={(s) => setStudents(prev => prev.map(p => p.id === s.id ? s : p))}
        />
      )}

      {tab === "school" && (
        <GiveSchoolFunds
          funds={funds}
          onDonate={(f) => setFunds(prev => prev.map(p => p.id === f.id ? f : p))}
        />
      )}
    </div>
  );
}

function Presets({ value, setValue }) {
  const options = [25, 50, 100, 250];
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(x => (
        <button
          key={x}
          onClick={() => setValue(x)}
          className={
            "rounded-xl border px-3 py-1 text-sm " +
            (value === x ? "bg-indigo-50 border-indigo-200 text-indigo-800" : "hover:bg-gray-50")
          }
        >
          ${x}
        </button>
      ))}
    </div>
  );
}

function GiveStudent({ students, onDonate, preselectId }) {
  const [q, setQ] = useState("");
  const [amt, setAmt] = useState(50);
  const [cover, setCover] = useState(true);
  const [selected, setSelected] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (preselectId && students.length) {
      const s = students.find(x => x.id === preselectId);
      if (s) setSelected(s);
    }
  }, [preselectId, students]);

  const matches = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return students;
    return students.filter(s =>
      [`${s.firstName} ${s.lastName}`, s.school, s.passcode]
        .some(x => String(x || "").toLowerCase().includes(t))
    );
  }, [q, students]);

  const total = cover ? Math.round(amt * 1.029 + 0.30) : amt; // example fee cover

  async function donate() {
    if (!selected) return;
    const res = await fetch("/api/donate/student", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ studentId: selected.id, amount: amt })
    });
    const data = await res.json();
    if (data.ok) { onDonate(data.student); setMsg("Thank you! Your donation has been recorded for this demo."); }
  }

  return (
    <div className="mt-5 card p-5">
      <div className="grid gap-4 md:grid-cols-5">
        <div className="md:col-span-3">
          <label className="block">
            <div className="label">Search by name, school, or pass-code</div>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="e.g. Sofia Patel or 123456"
              className="input"
            />
          </label>
          <div className="mt-3 grid grid-cols-1 gap-3">
            {matches.map(s => (
              <div
                key={s.id}
                className={
                  "flex items-center gap-3 rounded-xl border p-3 " +
                  (selected?.id === s.id ? "ring-2 ring-indigo-300" : "")
                }
                onClick={() => { setSelected(s); setMsg(""); }}
              >
                <div className="h-8 w-8 rounded-lg bg-indigo-100 text-indigo-900 flex items-center justify-center text-xs font-semibold">
                  {(s.firstName?.[0] || "?") + (s.lastName?.[0] || "")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{s.shareName ? `${s.firstName} ${s.lastName}` : "Anonymous Student"}</div>
                  <div className="text-xs text-gray-500">{s.school} • pass-code {s.passcode}</div>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Remaining</span>{" "}
                  <span className="font-medium">${s.remainingBalance.toLocaleString()}</span>
                </div>
              </div>
            ))}
            {q && matches.length === 0 && <div className="text-sm text-gray-500">No students found.</div>}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="rounded-xl border p-4">
            <div className="font-semibold">Contribution</div>
            {selected ? (
              <>
                <div className="mt-2 text-sm text-gray-600">
                  Giving to {selected.shareName ? `${selected.firstName} ${selected.lastName}` : "Anonymous Student"}
                </div>
                <div className="mt-3">
                  <Presets value={amt} setValue={setAmt} />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    className="w-28 input"
                    value={amt}
                    min={5}
                    step={5}
                    onChange={e => setAmt(Number(e.target.value))}
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" checked={cover} onChange={e => setCover(e.target.checked)} />
                    Cover processing fees (est. ${Math.max(0, total - amt).toLocaleString()})
                  </label>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button onClick={donate} className="btn btn-primary">
                    Donate ${total.toLocaleString()}
                  </button>
                  <a href={`/s/${selected.id}`} className="text-sm text-indigo-700 hover:underline">
                    View profile
                  </a>
                </div>
                {!!msg && <div className="mt-3 text-xs text-green-700">{msg}</div>}
                <div className="mt-3 text-xs text-gray-500">
                  Funds route to loan servicers in production; this demo records the donation in-memory.
                </div>
              </>
            ) : (
              <div className="mt-2 text-sm text-gray-600">Select a student to continue.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GiveSchoolFunds({ funds, onDonate }) {
  const [amt, setAmt] = useState(100);
  const [selected, setSelected] = useState(null);
  const [msg, setMsg] = useState("");

  async function donate() {
    if (!selected) return;
    const res = await fetch("/api/donate/school", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fundId: selected.id, amount: amt })
    });
    const data = await res.json();
    if (data.ok) { onDonate(data.fund); setMsg("Thank you! Your donation has been added to the fund (demo)."); }
  }

  return (
    <div className="mt-5 card p-5">
      <div className="grid gap-4 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="grid gap-3">
            {funds.map(f => (
              <div
                key={f.id}
                className={
                  "rounded-xl border p-3 " + (selected?.id === f.id ? "ring-2 ring-indigo-300" : "")
                }
                onClick={() => { setSelected(f); setMsg(""); }}
              >
                <div className="font-medium">{f.name}</div>
                <div className="text-xs text-gray-500">Current balance: ${f.balance.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="rounded-xl border p-4">
            <div className="font-semibold">Contribution</div>
            {selected ? (
              <>
                <div className="mt-2 text-sm text-gray-600">Giving to {selected.name}</div>
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="number"
                    className="w-28 input"
                    value={amt}
                    min={10}
                    step={10}
                    onChange={e => setAmt(Number(e.target.value))}
                  />
                  <button onClick={donate} className="btn btn-primary">
                    Donate ${amt.toLocaleString()}
                  </button>
                </div>
                {!!msg && <div className="mt-3 text-xs text-green-700">{msg}</div>}
                <div className="mt-3 text-xs text-gray-500">Tax-receipt handling to be added in production.</div>
              </>
            ) : (
              <div className="mt-2 text-sm text-gray-600">Select a fund to continue.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
