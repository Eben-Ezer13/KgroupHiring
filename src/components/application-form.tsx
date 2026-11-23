"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema, type ApplicationInput } from "@/lib/validation";
import { cities } from "@/config/content";
import { SocialCards } from "@/components/social-links";
import { WhatsAppIcon } from "@/components/brand-icons";
import { Check, LoaderCircle } from "lucide-react";
export function ApplicationForm(){
 const [success,setSuccess]=useState(false);const [serverError,setServerError]=useState("");
 const {register,handleSubmit,watch,formState:{errors,isSubmitting}}=useForm<ApplicationInput>({resolver:zodResolver(applicationSchema),defaultValues:{fullName:"",whatsapp:"",city:undefined,email:"",motivation:"",consent:false,website:""}});
 const motivation=watch("motivation","");
 async function submit(data:ApplicationInput){setServerError("");try{const response=await fetch("/api/applications",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(data)});const body=await response.json();if(!response.ok){setServerError(body.error||"Une erreur est survenue. Réessayez dans un instant.");return}setSuccess(true)}catch{setServerError("Connexion impossible. Vérifiez votre réseau puis réessayez.")}}
 if(success)return <div className="success-card"><Check size={34} color="#C9A85C"/><h3>Merci !</h3><p>Votre candidature a bien été reçue. Notre équipe vous contactera très prochainement sur WhatsApp pour programmer votre entretien. Le lien Google Meet vous sera ensuite envoyé par e-mail.</p><p><strong>Restez joignable : la réactivité est une qualité que nous valorisons.</strong></p><a className="button light" href="https://wa.me/212674072510" target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18}/>Nous écrire sur WhatsApp</a><p style={{marginTop:26,marginBottom:4}}>Pendant que vous attendez, suivez-nous</p><SocialCards compact/></div>;
 return <form className="form-panel" onSubmit={handleSubmit(submit)} noValidate><div className="honeypot" aria-hidden="true"><label htmlFor="website">Laissez ce champ vide</label><input id="website" tabIndex={-1} autoComplete="off" {...register("website")}/></div>
 <div className="field"><label htmlFor="fullName">Nom complet *</label><input id="fullName" autoComplete="name" {...register("fullName")}/>{errors.fullName&&<small className="error">{errors.fullName.message}</small>}</div>
 <div className="field"><label htmlFor="whatsapp">Numéro WhatsApp *</label><input id="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12 34 56 78" {...register("whatsapp")}/><small>Nous vous contacterons sur ce numéro pour programmer votre entretien.</small>{errors.whatsapp&&<small className="error">{errors.whatsapp.message}</small>}</div>
 <div className="field"><label htmlFor="city">Ville *</label><select id="city" {...register("city")}><option value="">Choisissez votre ville</option>{cities.map(c=><option key={c}>{c}</option>)}</select>{errors.city&&<small className="error">{errors.city.message}</small>}</div>
 <div className="field"><label htmlFor="email">E-mail *</label><input id="email" type="email" autoComplete="email" placeholder="vous@exemple.com" {...register("email")}/><small>Le lien de l'entretien Google Meet sera envoyé à cette adresse.</small>{errors.email&&<small className="error">{errors.email.message}</small>}</div>
 <div className="field"><label htmlFor="motivation">Votre motivation <span>(facultatif)</span></label><textarea id="motivation" maxLength={800} placeholder="Parlez-nous de votre expérience et de ce qui vous motive…" {...register("motivation")}/><div className="counter">{motivation?.length||0} / 800 caractères</div>{errors.motivation&&<small className="error">{errors.motivation.message}</small>}</div>
 <label className="consent"><input type="checkbox" {...register("consent")}/><span>J'accepte que KGroup Parfumery me contacte via WhatsApp et par e-mail concernant ma candidature et mon entretien. *</span></label>{errors.consent&&<small className="error">{errors.consent.message}</small>}
 {serverError&&<div className="status-box error" role="alert">{serverError}</div>}<button className="button dark" type="submit" disabled={isSubmitting}>{isSubmitting?<><LoaderCircle size={18} className="animate-spin"/> Envoi en cours…</>:"Envoyer ma candidature"}</button></form>
}
