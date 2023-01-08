const formulario = document.getElementById("formulario");
console.log(formulario);
formulario.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que el formulario se envíe de manera tradicional
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const matricula2 = document.getElementById("matricula").value.toString();
  console.log(matricula2, "matricula");
  const idPlaza = document.getElementById("ocupadas").value;
  const plazaActual = document.getElementById("plaza" + idPlaza);
  const Edit = {
    id: idPlaza,
    name: "plaza" + idPlaza,
    matricula: matricula2,
    ocupada: true,
    marca: marca,
    modelo: modelo,
  };
  const formData = new FormData();
  formData.append("json", JSON.stringify(Edit));
  fetch("http://localhost:8000/api/v1/parking/plazas/" + idPlaza, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Edit),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("modificado por formulario", data);
      if (plazaActual.hasChildNodes()) {
        plazaActual.innerHTML = "";
        const car = document.createElement("img");
        car.src = "./img/coche.jpg";
        car.className = "imgCoche";
        plazaActual.appendChild(car);
      } else {
        const car = document.createElement("img");
        car.src = "./img/coche.jpg";
        car.className = "imgCoche";
        plazaActual.appendChild(car);
      }
    });
});

///// ------ FUNCION PARA LIMPIAR VISUALMENTE EL TABLERO NO AFECTA A LA BDO------

const limpieza = () => {
  fetch("http://localhost:8000/api/v1/parking/plazas")
    .then((res) => res.json())
    .then((data) => {
      data.map((plaza) => {
        const plazaActual = document.getElementById("plaza" + plaza.id);
        if (plazaActual.hasChildNodes()) {
          plazaActual.innerHTML = "";
        }
      });
    });
};

const extractId = (text) => {
  return text.substring(5, text.lenght);
};

limpieza();

//// ------------ FUNCION PARA DESOCUPAR TODAS LAS PLAZAS DE LA BDO--------------

const todoDesocupado = () => {
  let contador = 0;

  while (contador < 21) {
    const plazaActual = document.getElementById("plaza" + contador);
    contador++;
    const Edit = {
      id: contador,
      name: "plaza" + contador,
      ocupada: false,
      matricula: "",
      marca: "",
      modelo: "",
    };
    const formData = new FormData();
    formData.append("json", JSON.stringify(Edit));
    fetch("http://localhost:8000/api/v1/parking/plazas/" + contador, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Edit),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("desocupar", data);
        if (plazaActual.hasChildNodes()) {
          plazaActual.innerHTML = "";
          const car = document.createElement("img");
          car.src = "./img/free.jpg";
          car.className = "imgFree";
          plazaActual.appendChild(car);
        } else {
          const car = document.createElement("img");
          car.src = "./img/free.jpg";
          car.className = "imgFree";
          plazaActual.appendChild(car);
        }
      });
  }
};

///-----------MUESTRA LAS PLAZAS LIBRES ---------------------------

const plazaLibres = () => {
  limpieza();
  fetch("http://localhost:8000/api/v1/parking/plazas")
    .then((res) => res.json())
    .then((data) => {
      data.map((plaza) => {
        const plazaActual = document.getElementById("plaza" + plaza.id);
        const car = document.createElement("img");
        car.src = "./img/free.jpg";
        car.className = "imgFree";
        if (plaza.ocupada == 0) plazaActual.appendChild(car);
      });
    });
};

/// -------------MUESTRAS LAS PLAZAS TOTALES OCUPADAS -------------------------------
const plazasOcupadasTotales = () => {
  limpieza();
  fetch("http://localhost:8000/api/v1/parking/plazas")
    .then((res) => res.json())
    .then((data) => {
      data.map((plaza) => {
        const plazaActual = document.getElementById("plaza" + plaza.id);
        const car = document.createElement("img");
        car.src = "./img/coche.jpg";
        car.className = "imgCoche";
        if (plaza.ocupada == 1) plazaActual.appendChild(car);
      });
    });
};

/// -------------------------MUESTRA PLAZAS PARES -----------------------------------------
const plazasPares = () => {
  limpieza();
  fetch("http://localhost:8000/api/v1/parking/plazas")
    .then((res) => res.json())
    .then((data) => {
      data.map((plaza) => {
        if (plaza.ocupada == 1 && plaza.id % 2 == 0) {
          const plazaActual = document.getElementById("plaza" + plaza.id);
          const car = document.createElement("img");
          car.src = "./img/coche.jpg";
          car.className = "imgCoche";
          plazaActual.appendChild(car);
        }
      });
    });
};

/// -------------------------MUESTRA PLAZAS IMPARES -----------------------------------------
const plazasImpares = () => {
  limpieza();
  fetch("http://localhost:8000/api/v1/parking/plazas")
    .then((res) => res.json())
    .then((data) => {
      data.map((plaza) => {
        if (plaza.ocupada == 1 && plaza.id % 2 !== 0) {
          const plazaActual = document.getElementById("plaza" + plaza.id);
          const car = document.createElement("img");
          car.src = "./img/coche.jpg";
          car.className = "imgCoche";
          plazaActual.appendChild(car);
        }
      });
    });
};

/// -------------------------CON UN CLICK DESOCUPA PLAZA --------------------------------------

const vaciarPlaza = (event) => {
  let padre = event.target.parentNode;
  if (padre.id !== "" && padre.id !== "container_parking") {
    const idCustom = extractId(padre.id);
    console.log(padre.id);
    const Edit = {
      id: idCustom,
      name: "plaza" + idCustom,
      ocupada: false,
      matricula: "",
      marca: "",
      modelo: "",
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(Edit));
    fetch("http://localhost:8000/api/v1/parking/plazas/" + idCustom, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Edit),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("desocupar", data);
        if (padre.hasChildNodes()) {
          padre.innerHTML = "";
        }
      });
  }
};

/// -------------------------CON DOS CLICK OCUPA PLAZA --------------------------------------

const ocuparPlaza = (event) => {
  const idCustom = extractId(event.target.id);
  const Edit = {
    id: idCustom,
    name: "plaza" + idCustom,
    ocupada: true,
  };

  const formData = new FormData();
  formData.append("json", JSON.stringify(Edit));
  fetch("http://localhost:8000/api/v1/parking/plazas/" + idCustom, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Edit),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("ocupar", data);
      if (
        !event.target.hasChildNodes() &&
        event.target.className !== "imgCoche"
      ) {
        const car = document.createElement("img");
        car.src = "./img/coche.jpg";
        car.className = "imgCoche";
        event.target.appendChild(car);
      }
    });
};

/// -------------------------DESOCUPA PLAZA PARES  --------------------------------------
const desocuparPlazasPares = () => {
  let contador = 0;

  while (contador < 21) {
    const plazaActual = document.getElementById("plaza" + contador);
    contador++;
    if (contador % 2 == 0) {
      const Edit = {
        id: contador,
        name: "plaza" + contador,
        ocupada: false,
        matricula: "",
        marca: "",
        modelo: "",
      };
      const formData = new FormData();
      formData.append("json", JSON.stringify(Edit));
      fetch("http://localhost:8000/api/v1/parking/plazas/" + contador, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Edit),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("desocupar", data);
          if (plazaActual.hasChildNodes()) {
            plazaActual.innerHTML = "";
          }
        });
    }
  }
};

//// ------------- RANDOM PLAZAS PARES -----------------------------------
const plazasParesAleatorias = async () => {
  let randomId = Array.from({ length: 15 }, () =>
    Math.floor(Math.random() * 20)
  );
  console.log(randomId);

  desocuparPlazasPares();

  randomId.map((id) => {
    plazasPares();
    const plazaActual = document.getElementById("plaza" + id);
    if (id % 2 == 0) {
      const Edit = {
        id: id,
        name: "plaza" + id,
        ocupada: true,
      };

      const formData = new FormData();
      formData.append("json", JSON.stringify(Edit));
      fetch("http://localhost:8000/api/v1/parking/plazas/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Edit),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("ocupar", data);
        });
    }
    plazasPares();
  });
};

/// -------------------------DESOCUPA PLAZA IMPARES  --------------------------------------
const desocuparPlazasImpares = () => {
  let contador = 0;
  while (contador < 21) {
    const plazaActual = document.getElementById("plaza" + contador);
    contador++;
    if (contador % 2 !== 0) {
      const Edit = {
        id: contador,
        name: "plaza" + contador,
        ocupada: false,
        matricula: "",
        marca: "",
        modelo: "",
      };
      const formData = new FormData();
      formData.append("json", JSON.stringify(Edit));
      fetch("http://localhost:8000/api/v1/parking/plazas/" + contador, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Edit),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("desocupar", data);
          if (plazaActual.hasChildNodes()) {
            plazaActual.innerHTML = "";
          }
        });
    }
  }
};

//// ------------- RANDOM PLAZAS IMPARES -----------------------------------
const plazasImparesAleatorias = async () => {
  let randomId = Array.from({ length: 15 }, () =>
    Math.floor(Math.random() * 20)
  );
  console.log(randomId);

  desocuparPlazasImpares();

  randomId.map((id) => {
    plazasImpares();
    const plazaActual = document.getElementById("plaza" + id);
    if (id % 2 !== 0) {
      const Edit = {
        id: id,
        name: "plaza" + id,
        ocupada: true,
      };

      const formData = new FormData();
      formData.append("json", JSON.stringify(Edit));
      fetch("http://localhost:8000/api/v1/parking/plazas/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Edit),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("ocupar", data);
        });
    }
    plazasImpares();
  });
  plazasImpares();
};
