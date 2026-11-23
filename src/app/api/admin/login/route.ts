import { NextRequest,NextResponse } from "next/server";
import { createSession,COOKIE } from "@/lib/admin-auth";
import { timingSafeEqual } from "node:crypto";
export async function POST(req:NextRequest){const {password}=await req.json().catch(()=>({password:""}));const expected=process.env.ADMIN_PASSWORD||"";const a=Buffer.from(String(password||""));const b=Buffer.from(expected);if(!expected||a.length!==b.length||!timingSafeEqual(a,b))return NextResponse.json({error:"Mot de passe incorrect."},{status:401});const res=NextResponse.json({ok:true});res.cookies.set(COOKIE,createSession(),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:43200});return res}
