function displayImages(productList) {
  console.log(productList);
  const containerCard = document.getElementById("container");

  productList.forEach((product) => {
    const column = document.createElement("div");
    column.classList.add("col-md-4");

    const card = document.createElement("div");
    card.classList.add("card", "mb-4", "shadow-sm");

    const imgCard = document.createElement("img");
    imgCard.classList.add("bd-placeholder-img", "card-img-top");
    imgCard.src = product.imageUrl;
    imgCard.style = "width:100%; height:500px; object-fit:cover";

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.style = "min-height:350px";

    const titleCard = document.createElement("h5");
    titleCard.classList.add("card-title");
    titleCard.innerText = product.name;

    const descr = document.createElement("p");
    descr.classList.add("card-text");
    descr.innerText = product.description;

    const containerG = document.createElement("div");
    containerG.classList.add("d-flex", "justify-content-between", "align-items-center");

    const containerBtn = document.createElement("div");
    containerBtn.classList.add("btn-group");

    const btnView = document.createElement("button");
    btnView.classList.add("btn", "btn-sm", "btn-outline-info");
    btnView.innerText = "View";
    btnView.addEventListener("click", () => openDetailView(product._id));
    containerBtn.appendChild(btnView);

    // BUTTON MODIFICA
    const btnEdit = document.createElement("button");
    btnEdit.classList.add("btn", "btn-sm", "btn-outline-danger", "mx-2");
    btnEdit.innerText = "Modifica";
    btnEdit.addEventListener("click", () => (window.location.href = `./backoffice.html?_id=${product._id}`));
    containerBtn.appendChild(btnEdit);
    // BUTTON MODIFICA

    const textMuted = document.createElement("small");
    textMuted.classList.add("text-muted");
    textMuted.innerText = "Il prezzo è di " + product.price + "€";

    cardBody.appendChild(titleCard);
    cardBody.appendChild(descr);

    containerBtn.appendChild(btnView);

    containerG.appendChild(containerBtn);
    cardBody.appendChild(containerG);
    containerG.appendChild(textMuted);

    column.appendChild(card);
    containerCard.appendChild(column);
    card.appendChild(imgCard);
    card.appendChild(cardBody);
  });
}

const openDetailView = (productId) => {
  window.location.href = `./detail.html?_id=${productId}`;
};

window.onload = () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTEzZjRjNTllYzAwMTk5MGQ3MGQiLCJpYXQiOjE3MDkyODU2OTUsImV4cCI6MTcxMDQ5NTI5NX0.6FMg5Uyl493_R6qIjAbpt2ajhvbtuqBUTvj6EMZYkNs",
    },
  })
    .then((response) => {
      console.log(response);

      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then((productList) => {
      console.log(productList);
      displayImages(productList);
    });
};
