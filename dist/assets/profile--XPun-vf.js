import{b as c}from"./firebase-D74WKzzr.js";document.addEventListener("DOMContentLoaded",async()=>{console.log("✅ Script cargado correctamente");const r=await new Promise(s=>{const o=c.onAuthStateChanged(t=>{o(),s(t)})});if(r){console.log("🔹 Usuario autenticado:",r.email);const s="https://raw.githubusercontent.com/Diegolazo14/videos/refs/heads/main/videos.json";try{const t=await(await fetch(s)).json();console.log("✅ Datos obtenidos del JSON:",t);const n=t.usuarios.find(a=>a.email===r.email);if(n&&n.videos.length>0){console.log("🎥 Videos del usuario:",n.videos);const a=document.getElementById("matches-container");a.innerHTML="",n.videos.forEach(i=>{const e=document.createElement("iframe");e.src=i.videoUrl,e.width="560",e.height="315",e.frameBorder="0",e.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",e.allowFullscreen=!0,a.appendChild(e)})}else console.log("❌ No se encontraron videos para este usuario."),document.getElementById("matches-container").innerHTML="<p>No has participado en ningún partido aún.</p>"}catch(o){console.error("🔥 Error al cargar JSON:",o)}}else console.log("⚠️ No hay usuario autenticado."),document.getElementById("matches-container").innerHTML="<p>Debes iniciar sesión para ver tus videos.</p>"});
