/*===============================
        CONTAINER
===============================*/

let Product = JSON.parse(localStorage.getItem("storedProduct")) || [];

const searchInput = document.querySelector(".searchBar input");
const addProduct = document.querySelector("#addProduct");
const closeAddProduct = document.querySelector(".form-close");
const addForm = document.querySelector("#addForm");
const urlInp = document.querySelector(".url");
const nameInp = document.querySelector(".name");
const priceInp = document.querySelector(".prices");

const urlChange = document.querySelector(".urlChange");
const nameChange = document.querySelector(".nameChange");
const priceChange = document.querySelector(".pricesChange");

const changeCard = document.querySelector(".change-card");
const changeProduct = document.querySelector("#changeForm");
const closeChangeProduct = document.querySelector(".change-card-close");

const shorting = document.querySelector("#shorting");

const cart = document.querySelector("#cart");
const cartClose = document.querySelector(".cartClose");
const cartData = document.querySelector(".cart-data");
const cartGroupCart = document.querySelector(".cart-group-cart");
const order = document.querySelector("#order");

let totalPrice = document.querySelector("#totalPrice");
let showAllCart = [];


let temp = null;

/*===============================
        METHOD 
===============================*/


let searchProduct = (e) => {
    let value = e.target.value.toLowerCase();

    let filteredData = Product.filter((item) =>
        item.nameInp.toLowerCase().includes(value)
    );

    document.querySelector(".group-card").innerHTML = "";

    filteredData.forEach((e, index) => {
        FillCardDetail(e.urlInp, e.nameInp, e.priceInp, index);
    });
    animCard();
};

let addProductCars = () => {

    gsap.to(".add-card", {
        onStart: () => {
            document.querySelector(".add-card").style.display = "block";
        },
        x: 0,
        opacity: 1,
        duration: .8,
        ease: "power3.out"
    })

    urlInp.value = "";
    nameInp.value = "";
    priceInp.value = "";
}

let closeProductCard = () => {
    gsap.to(".add-card", {
        x: 1300,
        opacity: 0,
        duration: .8,
        ease: "power3.out",
        onComplete: () => {
            document.querySelector(".add-card").style.display = "none";
        }
    })
    // document.querySelector(".add-card").style.display = "none";
}

let addCardDetail = (e) => {
    e.preventDefault();
    let Data = {
        urlInp: urlInp.value,
        nameInp: nameInp.value,
        priceInp: priceInp.value
    }
    // console.log(Data);
    Product.push(Data);
    storInLocalStorage();
    displayAllCard();
    animCard();
    closeAddProduct.click();
}

let FillCardDetail = (tSrc, tH3, tPrice, index) => {
    let img = document.createElement("img");
    img.src = tSrc;
    img.alt = tH3;

    let h3 = document.createElement("h3");
    h3.textContent = tH3

    let price = document.createElement("div");
    price.classList.add("price")
    price.textContent = `₹${tPrice}`;

    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = "Edit";
    btn.addEventListener("click", () => editCard(index));

    let btn2 = document.createElement("button");
    btn2.classList.add("btn");
    btn2.textContent = "Delete";
    btn2.addEventListener("click", () => deleteCard(index));

    let btn3 = document.createElement("button");
    btn3.classList.add("btn");
    btn3.textContent = "Add To Cart";
    btn3.addEventListener("click", () => addToCart(index));

    let btnDiv = document.createElement("div");
    btnDiv.classList.add("d-flex", "btnDiv");
    btnDiv.append(btn, btn2);

    let div = document.createElement("div");
    div.classList.add("card");
    div.append(img, h3, price, btnDiv, btn3);
    document.querySelector(".group-card").append(div);
}

let storInLocalStorage = () => {
    localStorage.setItem("storedProduct", JSON.stringify(Product));
}

let displayAllCard = () => {
    document.querySelector(".group-card").innerHTML = "";
    Product.forEach((e, index) => {
        FillCardDetail(e.urlInp, e.nameInp, e.priceInp, index);
    })
}

let animCard = () => {
    let tm = gsap.timeline();
    tm.to(".gro-card", {
        opacity: 1,
        x: 0,
        ease: "power3.out"
    })
    tm.to(".gro-card .card", {
        stagger: .3,
        opacity: 1,
        x: 0,
        ease: "power3.out"
    })
}

let deleteCard = (index) => {
    Product.splice(index, 1);
    storInLocalStorage();
    displayAllCard();
    OneTimeRun();
    animCard();

}

let editCard = (index) => {
    // changeCard.style.display = "flex";
    gsap.to(changeCard, {
        onStart: () => {
            changeCard.style.display = "flex";
        },
        x: 0,
        opacity: 1,
        duration: .6,
        ease: "power3.out"
    })

    let tempData = Product[index];

    temp = index;
    urlChange.value = tempData.urlInp;
    nameChange.value = tempData.nameInp;
    priceChange.value = tempData.priceInp;
}

let addToCart = (index) => {
    // console.log(index);
    // console.log(Product[index]);

    let data = {
        url: Product[index].urlInp,
        name: Product[index].nameInp,
        price: Number(Product[index].priceInp),
        quantity: 1,
        subQuantity: function () { return this.quantity * this.price }
    }
    // showAllCart.push(data);
    let found = false;
    showAllCart.forEach((e, ind) => {
        if (e.url == data.url && e.name == data.name) {
            plusQut(ind);
            displayCartData();
            found = true;
        }
    })
    if (!found) {
        showAllCart.push(data);
    }
    displayCartData();
    // console.log(showAllCart);

}

let displayCartData = () => {
    cartGroupCart.innerHTML = "";

    showAllCart.forEach((e, index) => {
        fillDataInTable(e, index);
    })
}

let fillDataInTable = (data, index) => {
    let div = document.createElement("div");
    div.classList.add("card")

    div.innerHTML = `
            <div class="d-flex">
                <img src= ${data.url}>
                    <h2 class="product-name">${data.name}</h2>
            </div>

            <div class="details d-flex">
                <p class="cart-price">₹ ${data.price}</p>

                <div class="quantity d-flex border">
                    <button class="minus" onclick = "minQut(${index})"><i class="ri-subtract-fill"></i></button>
                    <h2 class="qut">${data.quantity}</h2>
                    <button class="plus" onclick = "plusQut(${index})"><i class="ri-add-fill"></i></button>
                </div>

                <p class="subtotal">Subtotal: ₹${data.subQuantity()}</p>
                <button class="btn remove" onclick = "removeCartItem(${index})">Remove</button>
            </div>
        `
    // console.log(index);

    cartGroupCart.append(div);
    countTotalPayment();

}

let minQut = (index) => {
    console.log(index);
    // console.log(showAllCart[index]);

    if (showAllCart[index].quantity == 1) {
        showAllCart[index].quantity--;
        removeCartItem(index);
        displayCartData();
    }
    else if (showAllCart[index].quantity > 1) {
        showAllCart[index].quantity--;
        showAllCart[index].subQuantity();
        displayCartData();
    }
}

let plusQut = (index) => {
    showAllCart[index].quantity++;
    showAllCart[index].subQuantity();
    displayCartData();
}

let removeCartItem = (index) => {
    // console.log(index);
    showAllCart.splice(index, 1);
    displayCartData();
    animCard();
    countTotalPayment();
}

let countTotalPayment = () => {
    let tPrice = 0;
    showAllCart.forEach((e) => {
        tPrice += Number(e.subQuantity());
    })
    totalPrice.textContent = tPrice;
    if (totalPrice.textContent != 0) {
        document.querySelector(".tp").style.display = "inline-block";
        order.style.display = "inline-block";
    }
    else if (totalPrice.textContent == 0) {
        document.querySelector(".tp").style.display = "none";
        order.style.display = "none";
    }

}

let updateCardDetails = (e) => {
    e.preventDefault();

    Product[temp].urlInp = urlChange.value;
    Product[temp].nameInp = nameChange.value;
    Product[temp].priceInp = priceChange.value;


    storInLocalStorage();
    displayAllCard();
    animCard();
    closeChangeProductPage();

    temp = null;
}

let closeChangeProductPage = () => {
    gsap.to(changeCard, {
        x: 1300,
        opacity: 0,
        duration: .8,
        ease: "power3.out",
        onComplete: () => {
            changeCard.style.display = "none";
        }
    })

}

let shortData = (e) => {

    let selectedTarget = e.target.value;

    if (selectedTarget === "ascPrice") {
        let sortedData = [...Product].sort((a, b) =>
            Number(a.priceInp) - Number(b.priceInp)
        );
        someData(sortedData);
    }
    else if (selectedTarget === "DSCPrice") {
        let sortedData = [...Product].sort((a, b) =>
            Number(b.priceInp) - Number(a.priceInp)
        );
        someData(sortedData);
    }
    else if (selectedTarget === "clearAll") {
        displayAllCard();
        animCard();
    }
}

let someData = (tpData) => {
    document.querySelector(".group-card").innerHTML = "";
    tpData.forEach((e, index) => {
        FillCardDetail(e.urlInp, e.nameInp, e.priceInp, index);
    })
    animCard();
}

let closeCartMenu = () => {
    gsap.to(cartData, {
        x: 1300,
        opacity: 0,
        duration: .8,
        ease: "power3.out",
        onComplete: () => {
            cartData.style.display = "none";
        }
    })
    // cartData.style.display = "none";
}

let openCartMenu = () => {
    gsap.to(cartData, {
        onStart: () => {
            cartData.style.display = "block";
        },
        x: 0,
        opacity: 1,
        duration: .8,
        ease: "power3.out"
    })
    // cartData.style.display = "block";
}

let OneTimeRun = () => {
    const container = document.querySelector(".gro-card");

    // check if container is empty
    if (container.children.length === 0) {

        container.innerHTML = `
            <div class="card">
                <img src="" alt="Product Image">
                <h3>Product Heading</h3>
                <div class="price">₹ product Price</div>
                <button class="btn">Edit</button>
                <button class="btn">Delete</button>
                <button class="btn">Add to Cart</button>
            </div>
        `;

        animCard();
    }
};
let orderProduct = () => {
    // console.log("hello");
    setTimeout(() => {
        showAllCart = [];
        displayCartData();
        animCard();
        countTotalPayment()
        document.querySelector("#order-model").style.display = "inline-flex";
    }, 700);
}

let conformOrder = () => {
    document.querySelector("#order-model").style.display = "none";
    closeCartMenu();
}



/*===============================
        METHOD CALLING
===============================*/

addProduct.addEventListener("click", () => addProductCars());
closeAddProduct.addEventListener("click", () => closeProductCard())
addForm.addEventListener("submit", (e) => addCardDetail(e));
changeProduct.addEventListener("submit", (e) => updateCardDetails(e));
closeChangeProduct.addEventListener("click", () => closeChangeProductPage());
shorting.addEventListener("change", (e) => shortData(e));
searchInput.addEventListener("input", (e) => searchProduct(e));
cartClose.addEventListener("click", () => closeCartMenu());
cart.addEventListener("click", () => openCartMenu());
order.addEventListener("click", () => orderProduct());
conform.addEventListener("click", () => conformOrder());

displayAllCard();
window.addEventListener("load", () => OneTimeRun() )
animCard();


