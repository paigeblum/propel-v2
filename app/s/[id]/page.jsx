import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudentById } from "@/lib/db";

function Row({ label, value }){
  return (
    <div className="grid grid-cols-3 gap-3 text-sm">
      <div className="text-gray-500">{label}</div>
      <div className="col-span-2 font-medium">{value ?? "—"}</div>
    </div>
  );
}

export default async function Page({ params }){
  const s = getStudentById(params.id);
  if(!s) return notFound();
  const display = s.shareName ? `${s.firstName} ${s.lastName}` : "Anonymous Student";

  return (
    <div className="container-narrow py-8">
      <div className="card p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-900 font-semibold">
            {(s.firstName?.[0]||'?')+(s.lastName?.[0]||'')}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-semibold">{display}</h1>
            <div className="text-sm text-gray-600">{s.school} • {s.major}</div>
            <div className="mt-4 grid gap-3">
              <Row label="Raised" value={`$${s.raised.toLocaleString()}`} />
              <Row label="Remaining balance" value={`$${s.remainingBalance.toLocaleString()}`} />
              <Row label="Total balance" value={`$${s.totalBalance.toLocaleString()}`} />
              <Row label="Payments remaining" value={s.paymentsRemaining} />
              <Row label="Employer" value={s.employer || "—"} />
              <Row label="Job title" value={s.jobTitle || "—"} />
              <Row label="Annual salary" value={s.annualSalary ? `$${Number(s.annualSalary).toLocaleString()}` : "—"} />
              <Row label="Pass-code" value={s.passcode} />
            </div>

            <div className="mt-6">
              <div className="font-semibold">Story</div>
              <p className="mt-2 text-gray-800 whitespace-pre-wrap">{s.story || "—"}</p>
            </div>
            <div className="mt-6">
              <div className="font-semibold">Aspirations</div>
              <p className="mt-2 text-gray-800 whitespace-pre-wrap">{s.aspirations || "—"}</p>
            </div>

            <div className="mt-6 flex gap-2">
              <Link href="/donate" className="btn btn-primary">Donate</Link>
              <Link href="/students" className="btn btn-ghost">Back to students</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}