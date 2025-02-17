import { auth, db } from "./firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

auth.onAuthStateChanged(async (user) => {
    if (user) {
        console.log("Usuario autenticado:", user.email);
        console.log("Buscando datos en Firestore para:", user.email);

        try {
            const usersRef = collection(db, "Users");
            const q = query(usersRef, where("email", "==", user.email));
            console.log("Consulta preparada, ejecutando...");
            const querySnapshot = await getDocs(q);
            console.log("resultado de la consulta:", querySnapshot.empty ?"Sin resultados" : querySnapshot.size + " documentos encontrados");

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    console.log("Datos del usuario encontrados:", doc.data());

                    const userData = doc.data();
                    if (userData.matches && userData.matches.length > 0) {
                        const matchesContainer = document.getElementById("matches-container");
                        console.log("Partidos encontrados:", userData.matches);
                        userData.matches.forEach(match => {
                            console.log("Procesando partido:", match); // Depuración Extra
                            const matchElement = document.createElement("p");
                            matchElement.innerHTML = `Partido: ${match.matchId} - <a href="${match.videoUrl}" target="_blank">Ver video</a>`;
                            matchesContainer.appendChild(matchElement);
                        });
                    } else {
                        console.warn("El usuario no tiene partidos registrados.");
                    }
                });
            } else {
                console.error("No se encontró ningún usuario con ese email.");
                document.getElementById("matches-container").innerText = "No se encontraron partidos asociados a este usuario.";
            }
        } catch (error) {
            console.error("Error al obtener datos del usuario:", error);
        }
    } else {
        console.log("No hay usuario autenticado.");
        window.location.href = "index.html"; // Redirigir al login si no hay usuario autenticado
    }
});

// Función para cargar los datos del usuario autenticado
async function loadUserProfile() {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            console.log("Usuario autenticado:", user.email);
            const userData = await getUserDataByEmail(user.email);

            if (userData) {
                document.getElementById("user-name").textContent = userData.name || "Usuario desconocido";
                
                // Mostrar videos de los partidos
                const videosContainer = document.getElementById("videos-container");
                videosContainer.innerHTML = ""; // Limpiar contenido anterior
                
                if (userData.matches && userData.matches.length > 0) {
                    userData.matches.forEach((videoUrl) => {
                        const videoElement = document.createElement("iframe");
                        videoElement.src = videoUrl;
                        videoElement.width = "560";
                        videoElement.height = "315";
                        videoElement.frameBorder = "0";
                        videoElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                        videosContainer.appendChild(videoElement);
                    });
                } else {
                    videosContainer.innerHTML = "<p>No hay videos disponibles.</p>";
                }
            } else {
                console.error("Error al obtener datos del usuario.");
            }
        } else {
            console.error("No hay usuario autenticado.");
        }
    });
}

// Llamar la función cuando cargue la página
window.onload = loadUserProfile;
