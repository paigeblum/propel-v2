"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page(){
  const { status } = useSession();
  const routerReady = true;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  useEffect(()=>{ if(status === "authenticated"){ window.location.href = "/dashboard"; } }, [status]);

  async function onSubmit(e){
    e.preventDefault();
    setErr("");
    const res = await signIn("credentials", { email, password, redirect: false });
    if(res?.error){ setErr("Invalid email or password"); return; }
    router.push("/dashboard");
  }

  return (
    <div className="container-narrow py-8">
      <div className="mx-auto max-w-md card p-6">
        <h2 className="text-xl font-semibold">Sign in</h2>
        <p className="mt-2 text-sm text-gray-600">Demo accounts: donor@propel.org / donor123 and student@propel.org / student123</p>
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <label className="block">
            <div className="label">Email</div>
            <input type="email" className="input" value={email} onChange={e=>setEmail(e.target.value)} required />
          </label>
          <label className="block">
            <div className="label">Password</div>
            <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} required />
          </label>
          {err && <div className="text-sm text-red-600">{err}</div>}
          <button className="btn btn-primary w-full" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}