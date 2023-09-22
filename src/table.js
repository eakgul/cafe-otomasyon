let masalar = JSON.parse(localStorage.getItem("masalar")) || [];
let tableCounter = masalar.length + 1;

const tableLinks = document.querySelectorAll(".table");

tableLinks.forEach(tableLink => {
    tableLink.addEventListener("click", function (e) {
        e.preventDefault();
        const selectedTable = this.getAttribute("data-table");
        window.open(`product.html#${selectedTable}`, "_blank");
    });
});

const addTableButton = document.getElementById("addTable");

addTableButton.addEventListener("click", function () {
    const newTableDiv = document.createElement("div");
    const tableNumber = `table${tableCounter}`;
    newTableDiv.textContent = `Masa ${tableCounter}`;
    newTableDiv.className = "col-lg-2 col-md-3 col-sm-4 col-6 mb-4 table text-center";
    newTableDiv.style.cursor = "pointer";
    newTableDiv.setAttribute("data-table", tableNumber);
    newTableDiv.style.backgroundColor = "white";

    const deleteButton = document.createElement("span");
    deleteButton.textContent = " x";
    deleteButton.style.cursor = "pointer";
    deleteButton.className = "text-danger ml-2";
    newTableDiv.appendChild(deleteButton);

    const tableSelection = document.getElementById("tableSelection");
    tableSelection.appendChild(newTableDiv);

    newTableDiv.addEventListener("click", function () {
        const selectedTable = this.getAttribute("data-table");

        this.style.backgroundColor = "green";

        window.open(`product.html#${selectedTable}`, "_blank");
    });

    newTableDiv.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        const selectedTable = this.getAttribute("data-table");

        const masaIndex = masalar.findIndex(masa => masa.number === selectedTable);
        if (masaIndex !== -1) {
            masalar[masaIndex].backgroundColor = 'white';
            localStorage.setItem("masalar", JSON.stringify(masalar));
            this.style.backgroundColor = "white";
        }
    });

    masalar.push({ number: tableNumber, backgroundColor: 'white' });
    localStorage.setItem("masalar", JSON.stringify(masalar));
    tableCounter++;
});

window.addEventListener("load", function () {
    masalar.forEach((masa, index) => {
        const newTableDiv = document.createElement("div");
        newTableDiv.textContent = `Masa ${index + 1}`;
        newTableDiv.className = "table col-lg-2 col-md-3 col-sm-4 col-6 mb-4 text-center";
        newTableDiv.style.cursor = "pointer";
        newTableDiv.setAttribute("data-table", masa.number);
        newTableDiv.style.backgroundColor = masa.backgroundColor;

        const deleteButton = document.createElement("span");
        deleteButton.textContent = " x";
        deleteButton.style.cursor = "pointer";
        deleteButton.className = "text-danger ml-2";
        newTableDiv.appendChild(deleteButton);

        const tableSelection = document.getElementById("tableSelection");
        tableSelection.appendChild(newTableDiv);

        newTableDiv.addEventListener("click", function () {
            const selectedTable = this.getAttribute("data-table");

            this.style.backgroundColor = "green";

            window.open(`product.html#${selectedTable}`, "_blank");
        });

        newTableDiv.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            const selectedTable = this.getAttribute("data-table");

            const masaIndex = masalar.findIndex(masa => masa.number === selectedTable);
            if (masaIndex !== -1) {
                masalar[masaIndex].backgroundColor = 'white';
                localStorage.setItem("masalar", JSON.stringify(masalar));
                this.style.backgroundColor = "white";
            }
        });

        deleteButton.addEventListener("click", function (e) {
            e.stopPropagation();
            const selectedTable = newTableDiv.getAttribute("data-table");

            const confirmDelete = confirm("Bu masayı silmek istediğinizden emin misiniz?");
            if (confirmDelete) {
                masalar = masalar.filter(masa => masa.number !== selectedTable);
                localStorage.setItem("masalar", JSON.stringify(masalar));
                tableSelection.removeChild(newTableDiv);
            }
        });
    });
});
