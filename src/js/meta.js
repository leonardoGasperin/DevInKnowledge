import TipCard, { cardVt, deleteFromList, editMode, editing, editorInd } from "./card.js";

export function updateScreem(){
    document.getElementById("tipBoard").innerHTML = "";
    const totalVl = document.getElementById("total");
    const frontVl = document.getElementById("fE");
    const backVl = document.getElementById("bE");
    const fullStcVl = document.getElementById("fS");
    const softVl = document.getElementById("stS");
    const shrch = document.getElementById("search");

    totalVl.innerText = 0;
    frontVl.innerText = 0;
    backVl.innerText = 0;
    fullStcVl.innerText = 0;
    softVl.innerText = 0;

    loadCards();

    cardVt.filter((cards, i) => {
        if(cards.title.toLocaleLowerCase().includes(shrch.value.toLocaleLowerCase()))
            cards.makecard(cards, i.toString())

        switch (cards.cat) {
            case "FrontEnd":
                frontVl.innerText = Number(frontVl.innerText) + 1;
                totalVl.innerText = Number(totalVl.innerText) + 1;
                break;
            case "BackEnd":
                backVl.innerText = Number(backVl.innerText) + 1;
                totalVl.innerText = Number(totalVl.innerText) + 1;
                break;
            case "FullStack":
                fullStcVl.innerText = Number(fullStcVl.innerText) + 1;
                totalVl.innerText = Number(totalVl.innerText) + 1;
                break;
            case "SoftSkill":
                softVl.innerText = Number(softVl.innerText) + 1;
                totalVl.innerText = Number(totalVl.innerText) + 1;
                break;
            default:
                break;
        }
    })

    if(cardVt.length > 4){
        document.getElementById("tipBoard").style.overflowY = "scroll";
    }
    else
        document.getElementById("tipBoard").style.overflowY = "hidden";
}

export function saveCards(){
    const JSONCardSvr = JSON.stringify(cardVt);
    localStorage.setItem("Cards", JSONCardSvr);
}

function loadCards(){
    const loader = localStorage.getItem("Cards");

    if(loader && loader.length > 2){
        const _temp = JSON.parse(loader);

        cardVt.splice(0, cardVt.length)
    
        _temp.forEach(element => {
            element.hLink = (element.hLink == "" || element.hLink == undefined || element.hLink == true) ?  "" : element.hLink;
            
            cardVt.push(new TipCard(element.title, element.skill, element.cat, element.desc, element.hLink));
        });
    }
}

export function deletCard(ind){
    if(confirm(`reamente deseja deletar a Tip ${cardVt[Number(ind)].title}`)){
        if(document.getElementById("openOverlay").style.display == "flex"){
            document.getElementById("tipOpen").outerHTML = "";
            document.getElementById("openOverlay").style.display = "none";
        }
        deleteFromList(Number(ind));
        saveCards();
        updateScreem();
    }
}

export function callEditorMode(ind){
    document.getElementById("openOverlay").innerHTML = "";
    document.getElementById("openOverlay").style.display = "none";  
    alert(`Você agora esta abrindo o Edit Mode, qualquer alteração feita feita em ${cardVt[Number(ind)].title} sobrescreverá a Tip.`);
    
    editMode(Number(ind));
    document.getElementById("openOverlay").style.display = "flex";
}

export function cancelEditor(ind){
    if(confirm(`Gostaria de sair do Edit Mode? Todas as informações alteradas em ${cardVt[Number(ind)].title} não serão salvas`)){    
        document.getElementById("openOverlay").innerHTML = "";
        document.getElementById("openOverlay").style.display = "none";
    }

}

export function doEditor(ind){
    if(confirm(`Tem certeza que deseja editar a tip ${cardVt[ind].title}? Qualquer alteração será mantida.`)){
        editing(editorInd);
        saveCards();
        updateScreem();
        document.getElementById("openOverlay").innerHTML = "";
        document.getElementById("openOverlay").style.display = "none";
    }
}