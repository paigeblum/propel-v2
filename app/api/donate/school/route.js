import { NextResponse } from "next/server";
import { donateToFund } from "@/lib/db";

export async function POST(req){
  const body = await req.json();
  const { fundId, amount } = body || {};
  if(!fundId || !amount) return NextResponse.json({ ok:false, error:"Missing fundId or amount" }, { status: 400 });
  const f = donateToFund(fundId, amount);
  if(!f) return NextResponse.json({ ok:false, error:"Fund not found" }, { status: 404 });
  return NextResponse.json({ ok:true, fund: f });
}