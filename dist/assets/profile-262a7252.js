import{b as r,d,e as c,g as p}from"./firebase-6e02d4b2.js";document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("matches-list");r.onAuthStateChanged(async t=>{if(t){console.log("Usuario autenticado:",t.email);const i=d(c,"Users",t.uid),a=await p(i);if(a.exists()){const n=a.data().matches||[];e.innerHTML="",n.length>0?n.forEach(s=>{const o=document.createElement("div");o.innerHTML=`
                            <p><strong>Partido:</strong> ${s.matchId}</p>
                            <p><a href="${s.videoUrl}" target="_blank">Ver Resumen</a></p>
                            <hr>
                        `,e.appendChild(o)}):e.innerHTML="<p>No has participado en ningún partido aún.</p>"}else e.innerHTML="<p>Error al obtener datos del usuario.</p>"}else e.innerHTML="<p>No estás autenticado. Por favor, inicia sesión.</p>"})});
