import Card, { cardVt } from "./card.js";

const btnSv = document.getElementById("svCr");
const title = document.getElementById("title");
const skill = document.getElementById("skill");
const category = document.getElementById("category");
const desc = document.getElementById("desc");
const video = document.getElementById("video");

addEventListener("change", () => {
    //console.log()//assert
    
    if(title.value != "" && title.value.length >= 8 && skill.value != "" && skill.value.length >= 2
                         && category.selectedIndex != 0 && (desc.value == "" || desc.value.length >= 16))
        btnSv.disabled = false;
    else{
        btnSv.disabled = true;
    }
})

addEventListener("click", (e) => {
        if(e.target.className == "overlay")
            cardVt[Number(e.target.id)].openCard();
})

btnSv.addEventListener("click", () => {
    const card = new Card(
        title.value,
        skill.value,
        category.options[category.selectedIndex].text,
        desc.value,
        video.value
    )
    
    card.makecard(card);
})




function chkLink(hLink){
    if(hLink)
        return hLink;
    else
        video.value = "";
}