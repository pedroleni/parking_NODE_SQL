fetch("http://localhost:8000/api/v1/parking/plazas/20")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

const clear = () => {
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

const plaza = () => {
  limpiar();
  fetch("http://localhost:8000/api/v1/parking/plazas")
    .then((res) => res.json())
    .then((data) => {
      data.map((plaza) => {
        const plazaActual = document.getElementById("plaza" + plaza.id);
        const car = document.createElement("img");
        car.src = "./img/coche.jpg";
        car.className = "imgCoche";
        plazaActual.appendChild(car);
      });
    });
};
