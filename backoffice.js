fetch("https://striveschool-api.herokuapp.com/api/product/", {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTEzZjRjNTllYzAwMTk5MGQ3MGQiLCJpYXQiOjE3MDkyODU2OTUsImV4cCI6MTcxMDQ5NTI5NX0.6FMg5Uyl493_R6qIjAbpt2ajhvbtuqBUTvj6EMZYkNs",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("No data catch");
    }
  })
  .then((product) => {
    console.log(product);
  });

// AGGIUNGI PRODOTTO ALLA HOME
const addProduct = (e) => {
  e.preventDefault();
  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("urlImg").value,
    price: document.getElementById("price").value,
  };

  console.log(newProduct);

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTEzZjRjNTllYzAwMTk5MGQ3MGQiLCJpYXQiOjE3MDkyODU2OTUsImV4cCI6MTcxMDQ5NTI5NX0.6FMg5Uyl493_R6qIjAbpt2ajhvbtuqBUTvj6EMZYkNs",
    },
    body: JSON.stringify(newProduct),
  }).then((response) => {
    console.log(response);
  });
};

// AGGIUNGI PRODOTTO ALLA HOME END

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("_id");

function editProduct(productId) {
  console.log(`https://striveschool-api.herokuapp.com/api/product/${productId}`);
  // window.location.href = "./backoffice.html?id=" + productId;
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTEzZjRjNTllYzAwMTk5MGQ3MGQiLCJpYXQiOjE3MDkyODU2OTUsImV4cCI6MTcxMDQ5NTI5NX0.6FMg5Uyl493_R6qIjAbpt2ajhvbtuqBUTvj6EMZYkNs",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel  prodotto");
      }
    })
    .then((product) => {
      console.log("Product:", product);
      console.log("Product name:", product.name);
      console.log("Product description:", product.description);
      console.log("Product brand:", product.brand);
      console.log("Product imageUrl:", product.imageUrl);
      console.log("Product price:", product.price);

      const name = document.getElementById("name");
      const description = document.getElementById("description");
      const brand = document.getElementById("brand");
      const urlImg = document.getElementById("urlImg");
      const price = document.getElementById("price");

      name.value = product.name;
      description.value = product.description;
      brand.value = product.brand;
      urlImg.value = product.imageUrl;
      price.value = product.price;
    })
    .catch((error) => {
      console.error(error);
    });
}

window.onload = () => {
  if (productId) {
    const containerText = document.getElementById("container-text");
    const h4 = document.createElement("h4");
    h4.classList.add("mt-5", "display-5", "text-danger");
    h4.innerText = "MODALITA' MODIFICA";
    containerText.appendChild(h4);
    const containerBtn = document.getElementById("containerBtn");
    const addBtn = document.getElementById("addBtn");
    addBtn.style.display = "none";
    const delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-secondary");
    delBtn.setAttribute = ("id", "btnDelete");
    delBtn.innerText = "Elimina prodotto";
    containerBtn.appendChild(delBtn);

    delBtn.addEventListener("click", () => {
      deleteProduct(productId);
    });
    editProduct(productId);
  } else {
    const bntModify = document.getElementById("modifyBtn");
    bntModify.style.display = "none";
  }
};

//MODIFICA PRODOTTO
const modifyProduct = (e) => {
  const modifyProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("urlImg").value,
    price: document.getElementById("price").value,
  };

  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTEzZjRjNTllYzAwMTk5MGQ3MGQiLCJpYXQiOjE3MDkyODU2OTUsImV4cCI6MTcxMDQ5NTI5NX0.6FMg5Uyl493_R6qIjAbpt2ajhvbtuqBUTvj6EMZYkNs",
    },
    body: JSON.stringify(modifyProduct),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Prodotto modificato con successo");
      } else {
        throw new Error("Errore durante la modifica del prodotto");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const bntModify = document.getElementById("modifyBtn");
bntModify.addEventListener("click", modifyProduct);

const deleteProduct = (productId) => {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTEzZjRjNTllYzAwMTk5MGQ3MGQiLCJpYXQiOjE3MDkyODU2OTUsImV4cCI6MTcxMDQ5NTI5NX0.6FMg5Uyl493_R6qIjAbpt2ajhvbtuqBUTvj6EMZYkNs",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("prodotto eliminato");
      } else {
        throw new Error("errore");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
