import { auth, db } from "./firebase";
import { collection, doc, getDoc } from "firebase/firestore";

// Esperar a que el DOM cargue
document.addEventListener("DOMContentLoaded", async () => {
    const matchesList = document.getElementById("matches-list");

    // Verificar si el usuario está autenticado
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            console.log("Usuario autenticado:", user.email);

            // Obtener referencia al documento del usuario en Firestore
            const userRef = doc(db, "Users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                const matches = userData.matches || [];

                // Limpiar el contenido
                matchesList.innerHTML = "";

                if (matches.length > 0) {
                    matches.forEach((match) => {
                        const matchElement = document.createElement("div");
                        matchElement.innerHTML = `
                            <p><strong>Partido:</strong> ${match.matchId}</p>
                            <p><a href="${match.videoUrl}" target="_blank">Ver Resumen</a></p>
                            <hr>
                        `;
                        matchesList.appendChild(matchElement);
                    });
                } else {
                    matchesList.innerHTML = "<p>No has participado en ningún partido aún.</p>";
                }
            } else {
                matchesList.innerHTML = "<p>Error al obtener datos del usuario.</p>";
            }
        } else {
            matchesList.innerHTML = "<p>No estás autenticado. Por favor, inicia sesión.</p>";
        }
    });
});
