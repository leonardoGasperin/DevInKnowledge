import TipCard, { cardVt, chkLink} from "./card.js";
import { updateScreem, saveCards, deletCard, callEditorMode, cancelEditor, doEditor,  } from "./meta.js";

const form = document.getElementById("forms");
const btnSv = document.getElementById("svCr");
const title = document.getElementById("title");
const skill = document.getElementById("skill");
const category = document.getElementById("category");
const desc = document.getElementById("desc");
const video = document.getElementById("video");
const shrch = document.getElementById("search");

addEventListener("change", () => {
    if(checkForms())
        {
            btnSv.disabled = false;
        }else
            btnSv.disabled = true;
    
    if(document.getElementById("editEditor"))
    {
        if(checkForms(true))
        {
            document.getElementById("editEditor").disabled = false;
        }else{
            document.getElementById("editEditor").disabled = true;
        }
    }
})

// addEventListener("click", () => {
//     if(checkForms())
//         {
//             btnSv.disabled = false;
//         }
//     else
//         btnSv.disabled = true;
// })

addEventListener("click", (e) => {
    if(e.target.className == "overlay"){
        cardVt[Number(e.target.id)].openCard(cardVt[Number(e.target.id)], e.target.id);
        document.getElementById("openOverlay").style.display = "flex";
        cardVt[Number(e.target.id)]
    }
    else if(e.target.id == "vanderlay"){
        document.getElementById("tipOpn").outerHTML = "";
        document.getElementById("vanderlay").style.display = "none";
    }

    switch (e.target.id) {
        case "del":
            deletCard(e.target.name);
            break;
        case "edit":
            callEditorMode(e.target.name);
            break;
        case "delEditor":
            cancelEditor(e.target.name);
            break;
        case "editEditor":
            doEditor(e.target.name);
            break;
        case "openOverlay":
            document.getElementById("openOverlay").innerHTML = "";
            document.getElementById("openOverlay").style.display = "none";
            updateScreem();
            break;
        case "srchApply":
            updateScreem();
            break;
        case "srchCls":
            shrch.value = "";
            updateScreem();            
            break;
        default:
            break;
    }
})

btnSv.addEventListener("click", () => {
    shrch.value = "";

    if(title.value != "" && title.value != undefined && title.value.length >= 8 && skill.value != "" && skill.value.length >= 2
                         && category.selectedIndex != 0 && (desc.value == "" || desc.value.length >= 16))
        {
            btnSv.disabled = false;
            const card = new TipCard(
                title.value,
                skill.value,
                category.options[category.selectedIndex].text,
                desc.value,
                video.value
            )
            
            card.saveCardList(card);
            saveCards();
            alert(`A tip ${title.value} foi salva com sucesso!`);
            updateScreem();
        }
    else{
        btnSv.disabled = true;
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    title.value = "";
    skill.value = "";
    category.selectedIndex = 0;
    desc.value = "";
    video.value = "";  
})

function checkForms(isEdit = false){
    if(!isEdit){
        return (title.value != "" && title.value != undefined && title.value.length >= 8 && skill.value != "" && skill.value.length >= 2
                && category.selectedIndex != 0 && (desc.value == "" || desc.value.length >= 16) && chkLink(video.value));
    }else{
        return (document.getElementById("labelTitle").value != "" && document.getElementById("labelTitle").value != undefined  
                && document.getElementById("labelTitle").value.length >= 8 
                && document.getElementById("labelSkill").value != "" && document.getElementById("labelSkill").value.length >= 2
                && (document.getElementById("labelDesc").value == "" || document.getElementById("labelDesc").value.length >= 16)
                && (chkLink(document.getElementById("labelLink").value, true) ||  document.getElementById("labelLink").value == ""));
    }
}

updateScreem();