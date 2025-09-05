import Link from "next/link";
import BrowseStudents from "@/components/BrowseStudents";

function StatCard({label, value}){
  return (
    <div className="card p-5 text-center">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function HowStep({num, title, text}){
  return (
    <div className="card p-5">
      <div className="text-xs text-indigo-700 font-semibold">Step {num}</div>
      <div className="mt-1 font-semibold">{title}</div>
      <div className="mt-1 text-sm text-gray-600">{text}</div>
    </div>
  );
}

function Quote({q, by}){
  return (
    <div className="card p-5">
      <div className="italic text-gray-800">“{q}”</div>
      <div className="mt-2 text-sm text-gray-500">— {by}</div>
    </div>
  );
}

export default function Page(){
  return (
    <div className="container-narrow py-8">
      <div className="relative overflow-hidden card px-6 py-14 text-center">
        <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-indigo-100 blur-3xl opacity-60"></div>
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-50 blur-3xl opacity-70"></div>
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight">Student debt, reduced—together.</h1>
          <p className="mt-3 text-gray-600">Give directly to students or support tax-deductible school funds. Transparent, verified, and immediate impact.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/donate" className="btn btn-primary">Donate</Link>
            <Link href="/enroll" className="btn btn-ghost">Sign Up</Link>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Students" value={(130000).toLocaleString()} />
        <StatCard label="Total Debt" value={(475345230).toLocaleString('en-US', {style:'currency',currency:'USD', maximumFractionDigits:0})} />
        <StatCard label="Debt Relieved" value={(57825832).toLocaleString('en-US', {style:'currency',currency:'USD', maximumFractionDigits:0})} />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <HowStep num={1} title="Verify" text="Students submit enrollment & loan details (PDF/DOC) and choose name privacy." />
        <HowStep num={2} title="Find" text="Donors search by name, school, or pass-code — or contribute to school funds." />
        <HowStep num={3} title="Impact" text="Funds go to loan servicers. Dashboards show real-time progress." />
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold text-center">Browse current students</h3>
        <BrowseStudents />
        <div className="mt-4 flex justify-center">
          <a href="/students" className="btn btn-subtle">Browse all students</a>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-center">What supporters say</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <Quote q="It’s the most transparent way I’ve found to help." by="A. Nguyen, USC Alum" />
          <Quote q="I loved being able to search by school and major." by="M. Wright, Donor" />
          <Quote q="The privacy options gave me confidence to apply." by="Anonymous Student" />
        </div>
      </div>
    </div>
  );
}