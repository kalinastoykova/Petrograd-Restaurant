//get categories
function init() {
    fetch("https://kea-alt-del.dk/t5/api/categories").then(r => r.json()).then(
        function (data) {
            categoriesRec(data)
        }
    );
}
init();

function categoriesRec(categ) {
    createNav(categ);
    createSec(categ);
    getProducts();
}

function createSec(categories) {
    categories.forEach(category => {
        const section = document.createElement("section");
        section.setAttribute("id", category);
        const h3 = document.createElement("h3");
        h3.textContent = category;
        section.appendChild(h3);
        document.querySelector(".productList").appendChild(section);
    });
}

function createNav(categories) {
    categories.forEach(categ => {
        console.log(categ);
        const a = document.createElement("a");
        a.textContent = categ;
        a.setAttribute("href", `#${categ}`);
        document.querySelector("#menuList").appendChild(a);
    });
}


function getProducts() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (resp) {
            console.log(resp);
            return resp.json();
        })
        .then(function (data) {
            dataRec(data);
        })
}

function dataRec(products) {
    products.forEach(showProd);
}

function showProd(myProd) {
    console.log(myProd);

    const temp = document.querySelector("#productTemplate").content;
    const myCopy = temp.cloneNode(true);

    const imageName = myProd.image;
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + imageName + "-sm.jpg";
    const mediumImg = base + "medium/" + imageName + "-md.jpg";
    const largeImg = base + "large/" + imageName + ".jpg";

    myCopy.querySelector(".productName").textContent = myProd.name;
    myCopy.querySelector(".shortDesc").textContent = myProd.shortdescription;
    myCopy.querySelector(".price").textContent = myProd.price + "-,";
    myCopy.querySelector(".imgFood").src = mediumImg;

    if (!myProd.discount) {
        console.log("NO DISCOUNT");
        myCopy.querySelector(".sale").classList.add("hidden")
    }
    if (myProd.discount) {
        myCopy.querySelector(".price").classList.add("strike")
        myCopy.querySelector(".sale").textContent = myProd.price - myProd.discount + "-,";
    }
    if (!myProd.vegetarian) {
        console.log("NOT VEGETARIAN");
        myCopy.querySelector(".vegetarian").classList.add("hidden")
    }
    if (myProd.soldout) {
        console.log("SOLD OUT")
        const p = document.createElement("p");
        myCopy.querySelector(".imgFood").style.opacity = "0.5"
        p.textContent = "SOLD OUT";
        p.classList.add("soldOutP");
        myCopy.querySelector("article").appendChild(p);
    }
    if (!myProd.alcohol) {
        console.log("NON-ALCOHOLIC");
        myCopy.querySelector(".alcoholic").classList.add("hidden");
    }

    myCopy.querySelector(".moreInfo").addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=` + myProd.id)
            .then(res => res.json())
            .then(readMore);
    });

    const parentElem = document.querySelector("section#" + myProd.category);
    parentElem.appendChild(myCopy);

    const modal = document.querySelector(".modalBackground");

    function readMore(data) {
        console.log(data);
        modal.querySelector(".modalName").textContent = data.name;
        modal.querySelector(".modalDescr").textContent = data.longdescription;
        modal.style.display = "block";
        modal.querySelector(".modalPrice").textContent = myProd.price + "-,";
        modal.querySelector(".modalImg").src = mediumImg;
    }

    modal.addEventListener("click", function () {
        this.style.display = "none"
    });
}

const modal = document.querySelector(".modalBackground")
function showDet(data) {
    console.log(data);
    modal.querySelector(".modalName").textContent = data.name;
}
