import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getStudentById } from "@/lib/db";

function fmt(n){ return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }); }

function AnalyticsCard({ title, value, sub }){
  return (
    <div className="card p-5">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      {sub && <div className="mt-1 text-xs text-gray-500">{sub}</div>}
    </div>
  );
}

function Progress({ value }){
  return (
    <div className="h-2 w-full rounded bg-gray-100">
      <div className="h-2 rounded bg-indigo-600" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

function mockDonorAnalytics(){
  return {
    totalDonated: 1250,
    studentsSupported: 4,
    avgGift: 95,
    lastGifts: [
      { to: "Anonymous (UCLA)", amount: 50 },
      { to: "S. Patel (USC)", amount: 150 },
      { to: "M. Wright (NYU)", amount: 250 },
      { to: "Yale Fund", amount: 300 },
    ],
    bySchool: [
      { name: "USC", value: 35 },
      { name: "UCLA", value: 25 },
      { name: "NYU", value: 20 },
      { name: "Other", value: 20 },
    ]
  };
}

function mockStudentAnalytics(student){
  const raisedPct = Math.round((student.raised / Math.max(1, student.totalBalance)) * 100);
  const remainingMonths = Math.max(6, Math.round(student.paymentsRemaining - student.raised / 500));
  const recentSupport = [
    { by: "A. Nguyen", amount: 50 },
    { by: "Anonymous", amount: 25 },
    { by: "USC Alum", amount: 100 },
  ];
  return { raisedPct, remainingMonths, recentSupport };
}

export default async function Page(){
  const session = await getServerSession(authOptions);
  if(!session){
    return (
      <div className="container-narrow py-8">
        <div className="card p-6">
          <div className="font-semibold">Please sign in</div>
          <div className="mt-2"><Link href="/signin" className="text-indigo-700 hover:underline">Go to sign in</Link></div>
        </div>
      </div>
    );
  }

  const name = session.user?.name || "there";
  const role = session.user?.role || "donor";
  const studentId = session.user?.studentId;

  if(role === "student"){
    const s = studentId ? getStudentById(studentId) : null;
    const a = s ? mockStudentAnalytics(s) : null;
    return (
      <div className="container-narrow py-8">
        <h2 className="text-2xl font-semibold tracking-tight">Hi, {name}</h2>
        {s ? (
          <>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <AnalyticsCard title="Raised to date" value={fmt(s.raised)} />
              <AnalyticsCard title="Remaining balance" value={fmt(s.remainingBalance)} />
              <AnalyticsCard title="Progress" value={`${a.raisedPct}%`} sub={<Progress value={a.raisedPct} />} />
            </div>
            <div className="mt-6 card p-5">
              <div className="font-semibold">Recent support</div>
              <ul className="mt-2 text-sm text-gray-700 space-y-1">
                {a.recentSupport.map((r,i)=>(<li key={i}>{r.by} contributed <span className="font-medium">{fmt(r.amount)}</span></li>))}
              </ul>
            </div>
            <div className="mt-6 flex gap-2">
              <Link href={`/s/${s.id}`} className="btn btn-subtle">View your profile</Link>
              <Link href={`/donate?student=${s.id}`} className="btn btn-primary">Share donate link</Link>
            </div>
          </>
        ) : (
          <div className="mt-4 card p-6">We couldn’t find your linked student profile in this demo.</div>
        )}
      </div>
    );
  }

  const a = mockDonorAnalytics();
  return (
    <div className="container-narrow py-8">
      <h2 className="text-2xl font-semibold tracking-tight">Hi, {name}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <AnalyticsCard title="Total donated" value={fmt(a.totalDonated)} />
        <AnalyticsCard title="Students supported" value={a.studentsSupported} />
        <AnalyticsCard title="Average gift" value={fmt(a.avgGift)} />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <div className="font-semibold">Recent gifts</div>
          <ul className="mt-2 text-sm text-gray-700 space-y-1">
            {a.lastGifts.map((g,i)=>(<li key={i}><span className="font-medium">{fmt(g.amount)}</span> to {g.to}</li>))}
          </ul>
        </div>
        <div className="card p-5">
          <div className="font-semibold">By school (share)</div>
          <div className="mt-3 grid grid-cols-4 gap-3 text-sm">
            {a.bySchool.map((x,i)=>(
              <div key={i}>
                <div className="text-gray-500">{x.name}</div>
                <div className="mt-1 font-medium">{x.value}%</div>
                <div className="mt-1 h-2 rounded bg-gray-100">
                  <div className="h-2 rounded bg-indigo-600" style={{ width: `${x.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6"><Link href="/donate" className="btn btn-primary">Find a student to support</Link></div>
    </div>
  );
}