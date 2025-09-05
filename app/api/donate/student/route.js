import { NextResponse } from "next/server";
import { updateStudentDonation } from "@/lib/db";

export async function POST(req){
  const body = await req.json();
  const { studentId, amount } = body || {};
  if(!studentId || !amount) return NextResponse.json({ ok:false, error:"Missing studentId or amount" }, { status: 400 });
  const s = updateStudentDonation(studentId, amount);
  if(!s) return NextResponse.json({ ok:false, error:"Student not found" }, { status: 404 });
  return NextResponse.json({ ok:true, student: s });
}