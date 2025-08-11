document.addEventListener("DOMContentLoaded", () => {
    const url = "https://restcountries.com/v3.1/all?fields=name";
    const selectNacionalidad = document.getElementById("nacionalidad");

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.sort((a, b) => a.name.common.localeCompare(b.name.common));

            // Agregar opción inicial
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            selectNacionalidad.appendChild(defaultOption);

            // Agregar países
            data.forEach(pais => {
                const option = document.createElement("option");
                option.value = pais.name.common;
                option.textContent = pais.name.common;
                selectNacionalidad.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error al obtener los países:", error);
        });
});


function MensajeTipoSeguro() {
    const seguroSelect = document.getElementById("seguro");
    const tipo = seguroSelect.options[seguroSelect.selectedIndex].id;

    let mensaje = "";

    switch (tipo) {
        case "PBO":
            mensaje = "Protección Básica Obligatoria (PBO)\n" +
                      "Cubre daños al vehículo rentado y daños a vehículos terceros involucrados en un accidente de tránsito.\n" +
                      "Costo de alquiler diario: $5.45 por día.";
            break;
        case "PED":
            mensaje = "Protección Extendida de Daños (PED)\n" +
                      "Cubre la Protección Básica Obligatoria (PBO) más daños a propiedades de terceros, incendio e inundaciones.\n" +
                      "Costo de alquiler diario: $9.50 por día.";
            break;
        case "PGM":
            mensaje = "Protección Gastos Médicos (PGM)\n" +
                      "Cubre la Protección Extendida de Daños (PED) más gastos médicos para los ocupantes del vehículo.\n" +
                      "Costo de alquiler diario: $11.25 por día.";
            break;
    }

    alert(mensaje);
}