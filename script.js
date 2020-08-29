// fetch the data
fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(e => e.json())
    .then(dataReceived)

function dataReceived(foodItems) {
    //loop through the food items
    foodItems.forEach(showItem)
}

//executed once for each product
function showItem(myItem) {
    console.log(myItem);
    //find the template
    const temp = document.querySelector("#productTemplate").content;

    //image variables
    const imageName = myItem.image;
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + imageName + "-sm.jpg";
    const mediumImg = base + "medium/" + imageName + "-md.jpg";
    const largeImg = base + "large/" + imageName + ".jpg";

    //clone the template
    const myCopy = temp.cloneNode(true);

    //fill the template with content
    myCopy.querySelector(".productName").textContent = myItem.name;
    myCopy.querySelector(".shortDesc").textContent = myItem.shortdescription;
    myCopy.querySelector(".price").textContent = myItem.price + "-,";
	myCopy.querySelector(".imgFood").src = largeImg;


    //apend
    const parentElem = document.querySelector("section#starters");
    parentElem.appendChild(myCopy);
}
