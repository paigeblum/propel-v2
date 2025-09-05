"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

function NavBtn({ href, children }){
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));
  const cls = "rounded-xl px-3 py-2 text-sm font-medium " + (active ? "bg-indigo-50 text-indigo-800 border border-indigo-100" : "text-gray-700 hover:bg-gray-50");
  return <Link href={href} className={cls}>{children}</Link>;
}

function UserButtons(){
  const { data: session, status } = useSession();
  if(status === "loading"){
    return <div className="text-sm text-gray-500 px-3">Loading…</div>;
  }
  const authed = status === "authenticated" && session?.user;
  if(!authed){
    return (
      <>
        <Link href="/signin" className="btn btn-ghost">Sign In</Link>
        <Link href="/enroll" className="btn btn-primary">Sign Up</Link>
      </>
    );
  }
  return (
    <>
      <Link href="/dashboard" className="btn btn-subtle">Dashboard</Link>
      <button onClick={()=>signOut({ callbackUrl: "/" })} className="btn btn-ghost">Sign Out</button>
    </>
  );
}

export default function NavBar(){
  return (
    <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
      <div className="container-narrow flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-700 text-white font-bold">P</div>
          <div className="text-xl font-semibold">Propel</div>
        </div>
        <nav className="hidden md:flex items-center gap-2">
          <NavBtn href="/">Home</NavBtn>
          <NavBtn href="/donate">Donate</NavBtn>
          <NavBtn href="/students">Students</NavBtn>
          <NavBtn href="/about">About</NavBtn>
        </nav>
        <div className="flex items-center gap-2">
          <UserButtons />
        </div>
      </div>
    </header>
  );
}