import { NextResponse } from "next/server";
import { seedStudents } from "@/lib/data";
import { initStudents, getStudents, addStudent, getStudentById } from "@/lib/db";

initStudents(seedStudents);

export async function GET(req){
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if(id){
    const s = getStudentById(id);
    if(!s) return NextResponse.json({ ok:false, error:"Not found" }, { status:404 });
    return NextResponse.json({ student: s });
  }
  return NextResponse.json({ students: getStudents() });
}

export async function POST(req){
  const data = await req.formData();
  const student = {
    id: `stu_${Math.random().toString(36).slice(2,9)}`,
    firstName: data.get("firstName") || "",
    lastName: data.get("lastName") || "",
    shareName: String(data.get("shareName")) !== "false",
    email: data.get("email"),
    school: data.get("school"),
    major: data.get("major"),
    remainingBalance: Number(data.get("remainingBalance")||20000),
    totalBalance: Number(data.get("totalBalance")||40000),
    paymentsRemaining: Number(data.get("paymentsRemaining")||60),
    employer: data.get("employer") || "",
    jobTitle: data.get("jobTitle") || "",
    annualSalary: Number(data.get("annualSalary")||0),
    story: data.get("story") || "",
    aspirations: data.get("aspirations") || "",
    passcode: String(Math.floor(100000 + Math.random()*900000)),
    verificationFileName: (data.get("verification")?.name) || "Uploaded_File.pdf",
    raised: 0
  };
  addStudent(student);
  return NextResponse.json({ ok: true, student });
}