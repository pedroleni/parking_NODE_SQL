console.log("hols");

fetch("http://localhost:8000/api/v1/parking/plazas/20")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
