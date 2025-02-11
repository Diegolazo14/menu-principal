import{a as i,c as l,b as s,s as a}from"./firebase-6e02d4b2.js";console.log("Firebase inicializado correctamente:",i);document.addEventListener("DOMContentLoaded",()=>{console.log("DOM completamente cargado y listo."),document.getElementById("register-btn").addEventListener("click",()=>{const r=document.getElementById("content");r.innerHTML=`
        <h2 class="text-xl font-semibold mb-4">Registro</h2>
        <form id="register-form" class="space-y-4">
            <input type="email" id="register-email" placeholder="Correo electrónico" class="w-full px-4 py-2 border rounded-lg" required>
            <input type="password" id="register-password" placeholder="Contraseña" class="w-full px-4 py-2 border rounded-lg" required>
            <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700">Registrarse</button>
        </form>
    `,document.getElementById("register-form").addEventListener("submit",async t=>{t.preventDefault();const o=document.getElementById("register-email").value,n=document.getElementById("register-password").value;try{const e=await l(s,o,n);alert(`Usuario registrado: ${e.user.email}`)}catch(e){console.error("Error en el registro:",e),alert(`Error en el registro: ${e.message}`)}})}),document.getElementById("login-btn").addEventListener("click",()=>{const r=document.getElementById("content");r.innerHTML=`
        <h2 class="text-xl font-semibold mb-4">Iniciar Sesión</h2>
        <form id="login-form" class="space-y-4">
            <input type="email" id="login-email" placeholder="Correo electrónico" class="w-full px-4 py-2 border rounded-lg" required>
            <input type="password" id="login-password" placeholder="Contraseña" class="w-full px-4 py-2 border rounded-lg" required>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Iniciar Sesión</button>
        </form>
    `,document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const o=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{const e=await a(s,o,n);alert(`Bienvenido: ${e.user.email}`),window.location.href="/profile.html"}catch(e){console.error("Error al iniciar sesión:",e),alert(`Error al iniciar sesión: ${e.message}`)}})})});
