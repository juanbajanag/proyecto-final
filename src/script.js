// Botón
document.getElementById('btn').addEventListener('click', () => {
  alert('✅ ¡El sitio funciona!');
});

console.log('🚀 Sitio cargado');

// Detectar entorno
const isGitHubPages = window.location.hostname.includes("github.io");

// Función render
function render(lista, datos) {
  lista.innerHTML = datos.map(item => `
    <li>${item.nombre}</li>
  `).join('');
}

// Función principal
async function cargar(endpoint, elementoId) {
  const lista = document.getElementById(elementoId);

  try {
    // 👉 Si estás en GitHub Pages → usar datos mock
    if (isGitHubPages) {
      const datosMock = [
        { nombre: "Sección 1: CI/CD" },
        { nombre: "Sección 2: Docker" },
        { nombre: "Sección 3: Seguridad" }
      ];

      render(lista, datosMock);
      return;
    }

    // 👉 Si estás en Docker/local → usar API real
    const res = await fetch(`/api/${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const datos = await res.json();
    render(lista, datos);

  } catch (e) {
    lista.innerHTML = `<li class="error">Error al conectar con la API: ${e.message}</li>`;
  }
}

// Ejecutar
cargar('secciones', 'secciones');