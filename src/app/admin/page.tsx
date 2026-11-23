import { redirect } from "next/navigation";import { isAdmin } from "@/lib/admin-auth";import { prisma } from "@/lib/prisma";import { AdminDashboard } from "@/components/admin-dashboard";import { AdminLogin } from "@/components/admin-login";
export const dynamic="force-dynamic";
export default async function AdminPage(){if(!await isAdmin())return <main className="admin-wrap"><AdminLogin/></main>;const rows=await prisma.application.findMany({orderBy:{createdAt:"desc"}});return <main className="admin-wrap"><AdminDashboard initial={JSON.parse(JSON.stringify(rows))}/></main>}
