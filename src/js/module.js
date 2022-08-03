import Card, {  } from "./card.js";

const btnSvCreation = document.getElementById("svCr");
const title = document.getElementById("title");
const skill = document.getElementById("skill");
const category = document.getElementById("category");
const desc = document.getElementById("desc");
const video = document.getElementById("video");

addEventListener("keydown", () => {
    //console.log()//assert

    if(title.value != "" && title.value.length >= 7 && title.value.charAt(7) != "" && title.value.length <= 15
    && skill.value != "" && skill.value.length >= 2 /*&& skill.value.charAt(7) != ""*/ && title.value.length <= 15
    && category.selectedIndex != 0
    && (desc.value == "" || desc.value.length >= 16))
        btnSvCreation.disabled = false;
    else{
        btnSvCreation.disabled = true;
    }
})

addEventListener("click", () => {
    //console.log()//assert
    
    if(title.value != "" && title.value.length >= 7 && title.value.charAt(7) != "" && title.value.length <= 63
    && skill.value != "" && skill.value.length >= 2 /*&& skill.value.charAt(7) != ""*/ && title.value.length <= 15
    && category.selectedIndex != 0
    && (desc.value == "" || desc.value.length >= 16))
        btnSvCreation.disabled = false;
    else{
        btnSvCreation.disabled = true;
    }
})

btnSvCreation.addEventListener("click", () => {
    if((desc.value == "" || desc.value.length >= 16)){
        const card = new Card(
            title.value,
            skill.value,
            category.options[category.selectedIndex].text,
            desc.value,
            video.value
        )

        card.makecard(card);
    }
})

function chkLink(hLink){
    if(hLink)
        return hLink;
    else
        video.value = "";
}