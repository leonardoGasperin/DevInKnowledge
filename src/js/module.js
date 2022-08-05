import Card, { cardVt, chkLink, deleteFromList, editMode, editing, editorInd } from "./card.js";

const btnSv = document.getElementById("svCr");
const title = document.getElementById("title");
const skill = document.getElementById("skill");
const category = document.getElementById("category");
const desc = document.getElementById("desc");
const video = document.getElementById("video");
const shrch = document.getElementById("search");

addEventListener("change", () => {
    if(title.value != "" && title.value != undefined  && title.value.length >= 8 && skill.value != "" && skill.value.length >= 2
                         && category.selectedIndex != 0 && (desc.value == "" || desc.value.length >= 16) && chkLink(video.value))
        {
            btnSv.disabled = false;
        }
    else
        btnSv.disabled = true;
})

addEventListener("click", () => {
    if(title.value != "" && title.value != undefined && title.value.length >= 8 && skill.value != "" && skill.value.length >= 2
                         && category.selectedIndex != 0 && (desc.value == "" || desc.value.length >= 16) && chkLink(video.value))
        {
            btnSv.disabled = false;
        }
    else
        btnSv.disabled = true;
})

addEventListener("click", (e) => {
    if(e.target.className == "overlay"){
        cardVt[Number(e.target.id)].openCard(cardVt[Number(e.target.id)]);
        document.getElementById("vanderlay").style.display = "flex";
        cardVt[Number(e.target.id)]
    }
    else if(e.target.id == "vanderlay")
    {
        document.getElementById("tipOpn").outerHTML = "";
        document.getElementById("vanderlay").style.display = "none";
    }
    else if(e.target.id == "del"){
        deleteFromList(Number(e.target.name));
        if(document.getElementById("vanderlay").style.display == "flex")
            document.getElementById("vanderlay").style.display = "none";
        updateScreem();
    }
    else if(e.target.id == "edit"){
        console.log("1th xamada!");
        editMode(Number(e.target.name));
        document.getElementById("editlay").style.display = "flex";
    }
    else if(e.target.name == "edit"){
        editing(editorInd);
        updateScreem();
        document.getElementById("editlay").style.display = "none";
    }    
    else if(e.target.id == "editlay" || e.target.name == "del"){
        updateScreem();
        document.getElementById("editlay").style.display = "none";
    }
    else if(e.target.id == "srchApply"){
        console.log("PESQUISANDO!");
        updateScreem();
    }
    else if(e.target.id == "srchCls"){
        shrch.value = "";
        updateScreem();
    }
})

btnSv.addEventListener("click", () => {
    shrch.value = "";
    if(title.value != "" && title.value != undefined && title.value.length >= 8 && skill.value != "" && skill.value.length >= 2
                         && category.selectedIndex != 0 && (desc.value == "" || desc.value.length >= 16))
        {
            btnSv.disabled = false;
            const card = new Card(
                title.value,
                skill.value,
                category.options[category.selectedIndex].text,
                desc.value,
                video.value
            )
            
            card.saveTst(card);
            updateScreem();
        }
    else{
        btnSv.disabled = true;
    }
})

document.getElementById("forms").addEventListener("submit", (e) => {
    e.preventDefault();
    // title.value = "";
    // skill.value = "";
    // category.selectedIndex = 0;
    // desc.value = "";
    // video.value = "";  
})

function updateScreem(){
    document.getElementById("tipBoard").innerHTML = ""
    cardVt.filter((cards, i) => {
        if(cards.title.toLocaleLowerCase().includes(shrch.value.toLocaleLowerCase()))
            cards.makecard(cards, i.toString())
    })

    if(cardVt.length > 4){
        document.getElementById("tipBoard").style.overflowY = "scroll";
    }
    else
        document.getElementById("tipBoard").style.overflowY = "hidden";
}