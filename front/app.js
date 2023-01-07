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

const plaza = () => {
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
  console.log("entro en vaciar");
  const padre = event.target.parentNode;
  if (padre.id !== "") {
    const idCustom = extractId(padre.id);
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
