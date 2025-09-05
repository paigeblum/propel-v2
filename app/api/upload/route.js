import { NextResponse } from "next/server";
export async function POST(req){
  const data = await req.formData();
  const file = data.get("file");
  if(!file) return NextResponse.json({ ok:false, error: "No file provided" }, { status: 400 });
  return NextResponse.json({ ok:true, name: file.name, size: file.size, type: file.type });
}