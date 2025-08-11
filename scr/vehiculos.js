const vehiculos = {
  compacto: [
    { img: "images/Compacto1.png", desc: "KIA PICANTO, Año 2016" },
    { img: "images/Compacto2.png", desc: "FORD FIESTA ST, Año 2015" },
    { img: "images/Compacto3.png", desc: "PEUGEOT 308, Año 2018" },
  ],
  mediano: [
    { img: "images/Mediano1.png", desc: "HONDA CITY CAR, Año 2017" },
    { img: "images/Mediano2.png", desc: "MERCEDES SLS, Año 2015" },
    { img: "images/Mediano3.png", desc: "FORD FIESTA ST, Año 2016" },
  ],
  todoterreno: [
    { img: "images/TodoTerreno1.png", desc: "TOYOTA FJ CRUISER, Año 2016" },
    { img: "images/TodoTerreno2.png", desc: "TOYOTA Prado, Año 2018" },
    { img: "images/TodoTerreno3.png", desc: "NISSAN JUKE, Año 2017" },
  ],
  familiar: [
    { img: "images/Familiar1.png", desc: "TOYOTA SIENNA, Año 2018" },
    { img: "images/Familiar2.png", desc: "DODGE GRAND CARAVANE, Año 2015" },
    { img: "images/Familiar3.png", desc: "HYUNDAI ELANTRA, Año 2016" },
  ],
};

// Variable para guardar el tipo y la imagen actual
let tipoActual = "compacto";
let imgActualIndex = 0;

function mostrarTodo() {
  // Obtener el valor seleccionado del select (valor en el option no indica tipo, así que mapeamos)
  const select = document.getElementById("tipoVehiculo");
  const tipoValor = select.options[select.selectedIndex].id; // Ej: "COM", "MED", "4WD", "FAM"

  switch(tipoValor) {
    case "COM":
      tipoActual = "compacto";
      break;
    case "MED":
      tipoActual = "mediano";
      break;
    case "4WD":
      tipoActual = "todoterreno";
      break;
    case "FAM":
      tipoActual = "familiar";
      break;
    default:
      tipoActual = "compacto";
  }

  imgActualIndex = 0; // Reiniciamos a la primera imagen

  cargarImagenes();
  mostrarImagen(imgActualIndex + 1);
}

function cargarImagenes() {
  // Cargar las 3 imágenes pequeñas
  for(let i = 0; i < 3; i++) {
    const imgPeq = document.getElementById("img" + (i+1));
    imgPeq.src = vehiculos[tipoActual][i].img;
    imgPeq.alt = vehiculos[tipoActual][i].desc;
  }
}

function mostrarImagen(n) {
  // n es 1, 2 o 3 para la imagen pequeña clickeada
  imgActualIndex = n - 1;
  const imgPrincipal = document.getElementById("imgVista");
  const descripcion = document.getElementById("infTCar");

  imgPrincipal.src = vehiculos[tipoActual][imgActualIndex].img;
  imgPrincipal.alt = vehiculos[tipoActual][imgActualIndex].desc;
  descripcion.textContent = vehiculos[tipoActual][imgActualIndex].desc;
}