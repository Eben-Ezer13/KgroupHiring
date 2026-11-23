import {beforeEach,describe,expect,it,vi} from "vitest";
import {NextRequest} from "next/server";
const {create}=vi.hoisted(()=>({create:vi.fn()}));
vi.mock("@/lib/prisma",()=>({prisma:{application:{create}}}));
import {POST} from "./route";
const valid={fullName:"Amina El Amrani",whatsapp:"0612345678",city:"Fès",email:"amina@example.com",motivation:"Je souhaite rejoindre votre équipe et mettre mon énergie au service de vos clients.",consent:true,website:""};
describe("POST /api/applications",()=>{beforeEach(()=>{create.mockReset();create.mockResolvedValue({id:"app_1"})});it("enregistre une candidature valide et normalise le téléphone",async()=>{const request=new NextRequest("http://localhost/api/applications",{method:"POST",headers:{"content-type":"application/json","x-forwarded-for":"192.0.2.1"},body:JSON.stringify(valid)});const response=await POST(request);expect(response.status).toBe(201);expect(create).toHaveBeenCalledWith({data:expect.objectContaining({whatsapp:"+212612345678",city:"Fès"})})});it("rejette une motivation trop courte",async()=>{const request=new NextRequest("http://localhost/api/applications",{method:"POST",headers:{"content-type":"application/json","x-forwarded-for":"192.0.2.2"},body:JSON.stringify({...valid,motivation:"Trop court"})});const response=await POST(request);expect(response.status).toBe(400);expect(create).not.toHaveBeenCalled()})});
