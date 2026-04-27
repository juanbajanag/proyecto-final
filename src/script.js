document.getElementById('btn').addEventListener('click', () => {
    alert('✅ ¡El sitio funciona!');
});
console.log('🚀 Sitio cargado');

async function cargar(endpoint, elementoId) {
  const lista = document.getElementById(elementoId);

  try {
    const res = await fetch(`/api/${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const datos = await res.json();

    lista.innerHTML = datos.map(item => `
      <li>
        ${item.nombre}
      </li>
    `).join('');

  } catch (e) {
    lista.innerHTML = `<li class="error">Error al conectar con la API: ${e.message}</li>`;
  }
}

// Ejecutar
cargar('secciones', 'secciones');