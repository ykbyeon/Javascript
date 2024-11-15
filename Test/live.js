const liEliments = document.getElementsByTagName("li");

document.getElementById("addButton").addEventListener("click", () =>{
    const newLi = document.createElement("li");
    newLi.textContent = "새로운 메뉴";

    document.getElementById("list").appendChild(newLi);

    const liElimentsLength = liEliments.length;
    document.getElementById("li-length-val").textContent = liElimentsLength;
});
