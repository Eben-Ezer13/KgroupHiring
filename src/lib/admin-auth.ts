import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
const COOKIE = "kgroup_admin";
function signature(value: string) { const secret = process.env.SESSION_SECRET; if (!secret) throw new Error("SESSION_SECRET manquant"); return createHmac("sha256", secret).update(value).digest("hex"); }
export function validSession(token: string) { const [value, sig] = token.split("."); if (!value || !sig) return false; const expected = signature(value); return sig.length === expected.length && timingSafeEqual(Buffer.from(sig), Buffer.from(expected)) && Number(value) > Date.now(); }
export function createSession() { const value = String(Date.now() + 1000 * 60 * 60 * 12); return `${value}.${signature(value)}`; }
export async function isAdmin() { const token = (await cookies()).get(COOKIE)?.value; return !!token && validSession(token); }
export { COOKIE };
