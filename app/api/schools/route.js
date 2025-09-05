import { NextResponse } from "next/server";
import { getFunds } from "@/lib/db";
export async function GET(){ return NextResponse.json({ funds: getFunds() }); }