import { auth, db } from "./firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", async () => {
    console.log("✅ Script cargado correctamente");

    // Esperar a que Firebase autentique al usuario
    const checkUserAuth = () => {
        return new Promise((resolve) => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                unsubscribe();
                resolve(user);
            });
        });
    };

    const user = await checkUserAuth();

    if (user) {
        console.log("🔹 Usuario autenticado:", user.email);

        // URL del JSON en GitHub
        const jsonUrl = "https://raw.githubusercontent.com/Diegolazo14/videos/refs/heads/main/videos.json";

        try {
            // Obtener los datos del JSON
            const response = await fetch(jsonUrl);
            const data = await response.json();
            console.log("✅ Datos obtenidos del JSON:", data);

            // Buscar los videos del usuario autenticado
            const usuario = data.usuarios.find((u) => u.email === user.email);

            if (usuario && usuario.videos.length > 0) {
                console.log("🎥 Videos del usuario:", usuario.videos);

                const matchesContainer = document.getElementById("matches-container");
                matchesContainer.innerHTML = ""; // Limpiar contenido previo

                usuario.videos.forEach((video) => {
                    const videoElement = document.createElement("iframe");
                    videoElement.src = video.videoUrl;
                    videoElement.width = "560";
                    videoElement.height = "315";
                    videoElement.frameBorder = "0";
                    videoElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                    videoElement.allowFullscreen = true;
                    matchesContainer.appendChild(videoElement);
                });
            } else {
                console.log("❌ No se encontraron videos para este usuario.");
                document.getElementById("matches-container").innerHTML = "<p>No has participado en ningún partido aún.</p>";
            }
        } catch (error) {
            console.error("🔥 Error al cargar JSON:", error);
        }
    } else {
        console.log("⚠️ No hay usuario autenticado.");
        document.getElementById("matches-container").innerHTML = "<p>Debes iniciar sesión para ver tus videos.</p>";
    }
});
