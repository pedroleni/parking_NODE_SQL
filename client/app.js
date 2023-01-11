///// ---------- MANEJO DEL FORMULARIO----------------------------------

const formulario = document.getElementById("formulario");

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
      template();
      alert("Incluido con exito los datos introducidos");
      if (plazaActual.hasChildNodes()) {
        plazaActual.innerHTML = "";
        const car = document.createElement("img");
        car.src = "./img/coche.jpg";

        car.setAttribute("alt", `${marca} ${modelo} ${matricula2}`);
        car.className = "imgCoche";
        plazaActual.appendChild(car);
      } else {
        const car = document.createElement("img");
        car.src = "./img/coche.jpg";
        car.setAttribute("alt", `${marca} ${modelo} ${matricula2}`);
        car.className = "imgCoche";
        plazaActual.appendChild(car);
      }
      // Borramos los valores del imput si todo a ido bien
      document.getElementById("marca").value = "";
      document.getElementById("modelo").value = "";
      document.getElementById("matricula").value = "";
      // reseteamos la tabla con los valores actuales
      plazasOcupadasTotales();
    });
});

///// ------ FUNCION PARA LIMPIAR VISUALMENTE EL TABLERO NO AFECTA A LA BDO------

const limpieza = () => {
  fetch("http://localhost:8000/api/v1/parking/plazas")
    .then((res) => res.json())
    .then((data) => {
      template();
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
        template();
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
    template();
  }
};

///-----------MUESTRA LAS PLAZAS LIBRES -----------------------

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
        car.setAttribute(
          "alt",
          `${plaza.marca} ${plaza.modelo} ${plaza.matricula}`
        );
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
          car.setAttribute(
            "alt",
            `${plaza.marca} ${plaza.modelo} ${plaza.matricula}`
          );
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
          car.setAttribute(
            "alt",
            `${plaza.marca} ${plaza.modelo} ${plaza.matricula}`
          );
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
        template();
        console.log("desocupar", data);
        if (padre.hasChildNodes()) {
          padre.innerHTML = "";
        }
        plazasOcupadasTotales();
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
      plazasOcupadasTotales();
      template();
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
      template();
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
          template();
          console.log("desocupar", data);
          if (plazaActual?.hasChildNodes()) {
            plazaActual.innerHTML = "";
          }
        });
    }
  }
};

//// ------------- RANDOM PLAZAS PARES -----------------------------------
const plazasParesAleatorias = () => {
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
          template();
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
          template();
          console.log("desocupar", data);
          if (plazaActual?.hasChildNodes()) {
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
          template();
          console.log("ocupar", data);
        });
    }
    plazasImpares();
  });
  plazasImpares();
};

/// ---------------------------------------------------------------------------------------------
///---------------------------------------TABLE-------------------------------------------------
/// ---------------------------------------------------------------------------------------------

const thbody = () => {
  const tbbody = document.querySelector(".tbody");
  fetch("http://localhost:8000/api/v1/parking/plazas")
    .then((res) => res.json())
    .then((data) => {
      const desc = "desconocido";
      data.map((plaza) => {
        console.log("plaza.marca", plaza.marca.length);
        if (plaza.ocupada == 1) {
          tbbody.innerHTML += `
        <tr>
            <td>
                ${plaza.id}
                
            </td>
            <td>
                ${plaza.marca == "" ? desc : plaza.marca}
                
            </td>
            <td>
                ${plaza.modelo == "" ? desc : plaza.modelo}
                
            </td>
            <td>
                ${plaza.matricula == "" ? desc : plaza.matricula}
                
            </td>

        </tr>

        `;
        }
      });
    });
};

const template = () => {
  const table = document.querySelector(".container_table");
  table.innerHTML = `
          <div class="text_info">

          <h1>INSTRUCCIONES DE USO</h1>
        <p>Hay diferentes botones en la aplicaciones:</p>
        <ul>
          <li>
            <p>
              <b>VER PLAZAS LIBRES:</b> al pulsarlo se puede ver en el tablero todas
              las plazas libres con el simbolo en rojo de free.
            </p>
          </li>
          <li>
            <p>
            <b>VER PLAZAS OCUPADAS TOTALES:</b> al pulsarlo se puede ver en el
              tablero todas las plazas ocupadas con el simbolo del coche negro.
            </p>
          </li>
          <li>
            <p>
            <b>VER PLAZAS OCUPADAS PARES:</b> al pulsarlo se puede ver en el tablero
              todas las plazas ocupadas pares con el simbolo del coche.
            </p>
          </li>
          <li>
            <p>
            <b>VER PLAZAS OCUPADAS IMPARES:</b> al pulsarlo se puede ver en el
              tablero todas las plazas ocupadas impares con el simbolo del
              coche.
            </p>
          </li>
          <li>
            <p>
            <b>OCUPAR P. PARES ALEATORIAS:</b> se ocupan plazas pares de forma
              aleatoria. SOLO SE MUESTRAN LAS PARES.
            </p>
          </li>
          <li>
            <p>
            <b>OCUPAR P. IMPARES ALEATORIAS:</b> se ocupan plazas impares de forma
              aleatoria. SOLO SE MUESTRAN LAS IMPARES.
            </p>
          </li>
          <li>
            <p><b>LIMPIEZA DEL TABLERO:</b> no se mostrara ninguna imagen.</p>
          </li>
          <li>
            <p>
            <b>DESOCUPAR TODAS LAS PLAZAS:</b> se desocupan las plazas de la BDO y
              del table.
            </p>
          </li>
          <li>
          <b>ACCIONES CON EL RATÓN:</b>
            <ul>
              <li>
                <p><b>CLICK:</b> desocupa la plaza.</p>
              </li>
              <li>
                <p><b>DOBLE CLICK:</b> ocupa la plaza.</p>
              </li>
            </ul>
          </li>
        </ul>
        <p>
          Para introducir los datos del modelo, marca o matricula puede hacerlo
          desde el formulario. Este formulario tambien le servirá para poder
          ocupar una plaza que no estaba ocupada
        </p>
          
          </div>
           <table>
                <thead>
                    <tr class="title_column">
                        <th class="title_column">Plaza ocupada</th>
                        <th class="title_column">Marca</th>
                        <th class="title_column">Modelo</th>
                        <th class="title_column">Matricula</th>
                    </tr>
                </thead>

                <tbody class="tbody">
                    
                </tbody>
            </table>

    `;
  thbody();
};
template();
