document.addEventListener("DOMContentLoaded", () => {
    const urlCountries = "https://restcountries.com/v3.1/all?fields=name,cca3"; // Para llenar lista de países
    const selectNacionalidad = document.getElementById("nacionalidad");

    // Cargar países en el select
    fetch(urlCountries)
        .then(res => res.json())
        .then(data => {
            data.sort((a, b) => a.name.common.localeCompare(b.name.common));
            data.forEach(pais => {
                const option = document.createElement("option");
                option.value = pais.cca3; // usamos el cca3 para después buscar región
                option.textContent = pais.name.common;
                selectNacionalidad.appendChild(option);
            });
        });

    // Evento Calcular
    document.querySelector('input[value="Calcular"]').addEventListener("click", async () => {
        const fechaRetiro = new Date(document.querySelector('input[name="fechaRetiro"]').value);
        const fechaDevolucion = new Date(document.querySelector('input[name="fechadevolucion"]').value);

        // Calcular días
        const diffMs = fechaDevolucion - fechaRetiro;
        const dias = diffMs / (1000 * 60 * 60 * 24);

        // Validar rango de días
        if (dias < 3 || dias > 365) {
            alert("Los días no son correctos. Deben estar entre 3 y 365.");
            return;
        }
        document.querySelector('input[name="dias"]').value = dias;

        // Tarifa diaria según tipo de vehículo y seguro
        const tdVehiculo = parseFloat(document.getElementById("tipoVehiculo").value);
        const tdSeguro = parseFloat(document.getElementById("seguro").value);
        let tarifaDiaria = tdVehiculo + tdSeguro;

        // Descuento por días (en tarifa diaria)
        if (dias > 30 && dias < 120) {
            tarifaDiaria *= 0.85; // 15% descuento
        } else if (dias >= 120 && dias <= 365) {
            tarifaDiaria *= 0.75; // 25% descuento
        }
        document.querySelector('input[name="td"]').value = tarifaDiaria.toFixed(2) + "$";

        // Buscar descuento por región
        const cca3 = document.getElementById("nacionalidad").value;
        let descuentoRegion = 0;

        try {
            const resRegion = await fetch(`https://restcountries.com/v3.1/alpha?codes=${cca3}`);
            const paisData = await resRegion.json();
            const region = paisData[0].region;

            if (region === "Americas" || region === "Europe") {
                descuentoRegion = 0.10;
            } else if (region === "Africa") {
                descuentoRegion = 0.05;
            }
        } catch (err) {
            console.error("Error al obtener la región:", err);
        }

        // Calcular total a pagar
        const totalPagar = (tarifaDiaria * dias) - ((tarifaDiaria * dias) * descuentoRegion);
        document.querySelector('input[name="totalPagar"]').value = totalPagar.toFixed(2) + "$";
    });
});



const form = document.querySelector('.search'); 

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnGuardar").addEventListener("click", function () {
        console.log("Guardando en LocalStorage...");
        const cotizacion = {
            fechaRetiro: form.querySelector('[name="fechaRetiro"]').value,
            fechaDevolucion: form.querySelector('[name="fechadevolucion"]').value,
            nacionalidad: form.querySelector('[name="nacionalidad"]').value,
            tipoVehiculo: form.querySelector('[name="tipoVehiculo"]').value,
            seguro: form.querySelector('[name="seguro"]').value,
            dias: form.querySelector('[name="dias"]').value,
            tarifaDiaria: form.querySelector('[name="td"]').value,
            totalPagar: form.querySelector('[name="totalPagar"]').value
        };

        localStorage.setItem("ultimaCotizacion", JSON.stringify(cotizacion));
        alert("Cotización guardada correctamente");
    });
});


// Mostrar última cotización al cargar
window.addEventListener('load', () => {
    const guardada = localStorage.getItem("ultimaCotizacion");
    if (guardada) {
        const datos = JSON.parse(guardada);

        form.fechaRetiro.value = datos.fechaRetiro;
        form.fechadevolucion.value = datos.fechaDevolucion;
        form.nacionalidad.value = datos.nacionalidad;
        form.tipoVehiculo.value = datos.tipoVehiculo;
        form.seguro.value = datos.seguro;
        form.dias.value = datos.dias;
        form.td.value = datos.tarifaDiaria;
        form.totalPagar.value = datos.totalPagar;
    }
});