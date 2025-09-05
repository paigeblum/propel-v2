export default function Page(){
  return (
    <div className="container-narrow py-8">
      <h2 className="text-2xl font-semibold">About Propel</h2>
      <p className="mt-2 text-gray-700 max-w-3xl">
        Propel connects donors directly with verified students to reduce education debt in a transparent, privacy-respecting way.
        Our approach is simple: verification first, clear profiles, and funds routed to loan servicers—never through students.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <div className="font-semibold">Why we exist</div>
          <p className="mt-2 text-sm text-gray-700">Student debt delays careers, families, and home ownership. We make it possible for
          individuals and institutions to target their giving where it changes trajectories fastest.</p>
        </div>
        <div className="card p-5">
          <div className="font-semibold">How verification works</div>
          <p className="mt-2 text-sm text-gray-700">Students upload a recent statement (PDF/DOC) and provide school and loan details.
          Profiles become visible only after review and name-privacy settings are honored.</p>
        </div>
        <div className="card p-5">
          <div className="font-semibold">Privacy by default</div>
          <p className="mt-2 text-sm text-gray-700">Students can appear as an alias; public pages use initials instead of photos.
          Donors can search by pass-code provided directly by students.</p>
        </div>
        <div className="card p-5">
          <div className="font-semibold">Funds & compliance</div>
          <p className="mt-2 text-sm text-gray-700">In production, payments are directed to loan servicers or school funds.
          We provide receipts for tax purposes and maintain auditable records.</p>
        </div>
      </div>

      <div className="mt-6 card p-5">
        <div className="font-semibold">Contact</div>
        <p className="mt-2 text-sm text-gray-700">Interested in partnering, sponsoring, or serving as a fiscal sponsor? Email us at <a className="text-indigo-700 hover:underline" href="mailto:contact@propel.org">contact@propel.org</a>.</p>
      </div>
    </div>
  );
}