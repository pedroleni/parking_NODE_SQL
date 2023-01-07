const limpieza = () => {
  let miarray = Array.from({ length: 15 }, () =>
    Math.floor(Math.random() * 20)
  );
  console.log(miarray);
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

const todoDesocupado = () => {
  let contador = 0;

  while (contador < 21) {
    const plazaActual = document.getElementById("plaza" + contador);
    contador++;
    const Edit = {
      id: contador,
      name: "plaza" + contador,
      ocupada: false,
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

const vaciarPlaza = (event) => {
  let padre = event.target.parentNode;
  if (padre.id !== "" && padre.id !== "container_parking") {
    const idCustom = extractId(padre.id);
    console.log(padre.id);
    const Edit = {
      id: idCustom,
      name: "plaza" + idCustom,
      ocupada: false,
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
