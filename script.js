const garmentsForm = document.getElementById("garmentsForm");
let editingGarment = null; // Variable para rastrear la prenda que se está editando

garmentsForm.addEventListener("submit", function(event){
    event.preventDefault();

    const garmentMark = document.getElementById("garmentMark");
    const garmentStatus = document.getElementById("garmentStatus");
    const garmentOcca = document.getElementById("garmentOcca");
    const garmentImage = document.getElementById("garmentImage");

    const mark = garmentMark.value.trim();
    const status = garmentStatus.value.trim();
    const occasion = garmentOcca.value.trim();
    const imageFile = garmentImage.files[0];

    if (mark === "" || status === "" || occasion === "") {
        alert("Todos los campos son obligatorios.");
        return;
    }

    if (editingGarment) {
        // Actualizar prenda existente
        editingGarment.querySelector(".garment-mark").textContent = `Marca: ${mark}`;
        editingGarment.querySelector(".garment-status").textContent = `Estado: ${status}`;
        editingGarment.querySelector(".garment-occasion").textContent = `Ocasión: ${occasion}`;

        if (imageFile) {
            const img = editingGarment.querySelector("img");
            img.src = URL.createObjectURL(imageFile);
        }

        editingGarment = null; // Restablecer la variable de edición
    } else {
        // Crear nuevo elemento de prenda
        const newGarment = document.createElement("div");
        newGarment.classList.add("garment-card");

        const img = document.createElement("img");
        img.src = imageFile ? URL.createObjectURL(imageFile) : "";

        const markText = document.createElement("p");
        markText.classList.add("garment-mark");
        markText.textContent = `Marca: ${mark}`;

        const statusText = document.createElement("p");
        statusText.classList.add("garment-status");
        statusText.textContent = `Estado: ${status}`;

        const occasionText = document.createElement("p");
        occasionText.classList.add("garment-occasion");
        occasionText.textContent = `Ocasión: ${occasion}`;

        // Botones de acción
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.classList.add("edit-btn");
        editButton.addEventListener("click", () => editGarment(newGarment, mark, status, occasion));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => newGarment.remove());

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.alignItems = "center";

        container.appendChild(img);
        container.appendChild(markText);
        container.appendChild(statusText);
        container.appendChild(occasionText);
        container.appendChild(editButton);
        container.appendChild(deleteButton);
        newGarment.appendChild(container);

        document.getElementById("garmentList").appendChild(newGarment);
    }

    garmentsForm.reset();
});

// Función para editar una prenda
function editGarment(garment, mark, status, occasion) {
    document.getElementById("garmentMark").value = mark;
    document.getElementById("garmentStatus").value = status;
    document.getElementById("garmentOcca").value = occasion;
    editingGarment = garment; // Guardamos la prenda que se está editando
}



//FAVORITE COLORS
const colors = document.querySelectorAll(".colors-1 img"); // Selecciona todos los elementos con la clase "colors-1"
colors.forEach(color => { 
    color.addEventListener("mouseover", function(){
        color.style.boxShadow = "0 0 15px rgba(1, 19, 39, 0.7)"; // Agrega la sombra cuando el mouse pasa
    });

    color.addEventListener("mouseout", function(){
        color.style.boxShadow = "none"; // Quita la sombra cuando el mouse sale
    });
});
//FAVORITE GARMENTS
const fav = document.querySelectorAll(".fav-1 img");
fav.forEach(favs => { 
    favs.addEventListener("mouseover", function(){
        favs.style.transform = "translateY(-30px)";
    });

    favs.addEventListener("mouseout", function(){
        favs.style.transform = "none"; // Quita la sombra cuando el mouse sale
    });
});

