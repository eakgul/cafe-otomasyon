const jsonUrl = 'src/product.json';

let totalPrice = 0;

fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
        const cardContainer = document.getElementById("cardContainer");
        const selectedProductList = document.getElementById("selectedProductList");
        const totalPriceElement = document.getElementById("totalPrice");

        data.urunler.forEach(urun => {
            const card = createProductCard(urun.urunAdi, urun.fiyat, urun.resim);

            card.addEventListener("click", () => {

                const listItem = document.createElement("li");

                const itemText = `${urun.urunAdi} - ${urun.fiyat} TL`;

                const itemSpan = document.createElement("span");
                itemSpan.textContent = " x ";

                itemSpan.addEventListener("click", (event) => {
                    selectedProductList.removeChild(listItem);
                        
                    totalPrice -= urun.fiyat;
                    totalPriceElement.textContent = `Toplam Fiyat: ${totalPrice} TL`;

                    const selectedTable = window.location.hash.substring(1);
                    const savedProducts = JSON.parse(localStorage.getItem(`products-${selectedTable}`)) || [];
                    const updatedProducts = savedProducts.filter(savedProduct => savedProduct.name !== urun.urunAdi);
                    localStorage.setItem(`products-${selectedTable}`, JSON.stringify(updatedProducts));

                    event.stopPropagation();
                });

                listItem.textContent = itemText;
                listItem.appendChild(itemSpan);

                selectedProductList.appendChild(listItem);

                totalPrice += urun.fiyat;
                totalPriceElement.textContent = `Toplam Fiyat: ${totalPrice} TL`;

                const selectedTable = window.location.hash.substring(1);
                const savedProducts = JSON.parse(localStorage.getItem(`products-${selectedTable}`)) || [];
                savedProducts.push({
                    name: urun.urunAdi,
                    price: urun.fiyat,
                });
                localStorage.setItem(`products-${selectedTable}`, JSON.stringify(savedProducts));
            });

            card.classList.add("col-lg-2", "col-md-3", "col-sm-4", "col-6", "mb-4");

            cardContainer.appendChild(card);
        });
    })
    .catch(error => console.error('JSON okuma hatası:', error));

function createProductCard(productName, productPrice, productImage) {
    const card = document.createElement("div");
    card.className = "card mt-4 mr-3";

    const image = document.createElement("img");
    image.src = productImage;
    image.alt = productName;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = productName;

    const cardPrice = document.createElement("p");
    cardPrice.className = "card-text";
    cardPrice.textContent = `Fiyat: ${productPrice} TL`;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardPrice);

    card.appendChild(image);
    card.appendChild(cardBody);

    return card;
}

window.addEventListener("load", function () {
    const selectedTable = window.location.hash.substring(1);
    const savedProducts = JSON.parse(localStorage.getItem(`products-${selectedTable}`)) || [];

    savedProducts.forEach(product => {
        const selectedProductList = document.getElementById("selectedProductList");
        const totalPriceElement = document.getElementById("totalPrice");

        const listItem = document.createElement("li");

        const itemText = `${product.name} - ${product.price} TL`;

        const itemSpan = document.createElement("span");
        itemSpan.textContent = " x ";

        itemSpan.addEventListener("click", (event) => {
  
            selectedProductList.removeChild(listItem);

            totalPrice -= parseFloat(product.price);
            totalPriceElement.textContent = `Toplam Fiyat: ${totalPrice} TL`;

            const savedProducts = JSON.parse(localStorage.getItem(`products-${selectedTable}`)) || [];
            const updatedProducts = savedProducts.filter(savedProduct => savedProduct.name !== product.name);
            localStorage.setItem(`products-${selectedTable}`, JSON.stringify(updatedProducts));

            event.stopPropagation();
        });

        listItem.textContent = itemText;
        listItem.appendChild(itemSpan);

        selectedProductList.appendChild(listItem);

        totalPrice += parseFloat(product.price);
        totalPriceElement.textContent = `Toplam Fiyat: ${totalPrice} TL`;
    });
});
