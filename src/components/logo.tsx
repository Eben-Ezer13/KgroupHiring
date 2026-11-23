import Image from "next/image";
export function Logo({light=false}:{light?:boolean}){return <a className={`logo${light?" logo-light":""}`} href="#accueil" aria-label="KGroup Parfumery, accueil"><Image src="/images/logo.jpeg" alt="" width={48} height={48} priority/><span><strong>KGroup Parfumery</strong><small>La senteur du luxe</small></span></a>}
