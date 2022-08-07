/**toda a logica para atualizar os metadados da pagina
 */
import TipCard, { cardVt, deleteFromList, editMode, editing, editorInd } from "./card.js";

export function updateScreem(){
    //prepara elementos html do painel direito a ser atualizado
    document.getElementById("tipBoard").innerHTML = "";
    const totalVl = document.getElementById("total");
    const frontVl = document.getElementById("fE");
    const backVl = document.getElementById("bE");
    const fullStcVl = document.getElementById("fS");
    const softVl = document.getElementById("stS");
    const shrch = document.getElementById("search");

    //zera estatistica
    totalVl.innerText = 0;
    frontVl.innerText = 0;
    backVl.innerText = 0;
    fullStcVl.innerText = 0;
    softVl.innerText = 0;

    //carrega novas meta data
    loadCards();

    //e prepara o filto para mostar cartoes na tela ou pesquisados
    cardVt.filter((cards, i) => {
        if(cards.title.toLocaleLowerCase().includes(shrch.value.toLocaleLowerCase()))
            cards.makecard(cards, i.toString())

        //atualiza valores das estatistica
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

    if(loader && loader.length > 2){//checa de loader é vazio
        const _temp = JSON.parse(loader);

        cardVt.splice(0, cardVt.length)//limpa a lista antiga
    
        _temp.forEach(element => {//adiciona a lista antiga
            element.hLink = (element.hLink == "" || element.hLink == undefined || element.hLink == true) ?  "" : element.hLink;//segurança em priemiro lugar
            
            cardVt.push(new TipCard(element.title, element.skill, element.cat, element.desc, element.hLink));
        });
    }
}

export function deletCard(ind){
    if(confirm(`reamente deseja deletar a Tip ${cardVt[Number(ind)].title}`)){
        deleteFromList(Number(ind));
        saveCards();
        if(document.getElementById("vanderlay").style.display == "flex"){
            document.getElementById("tipOpn").outerHTML = "";
            document.getElementById("vanderlay").style.display = "none";
        }
        updateScreem();
    }
}

export function callEditorMode(ind){
    alert(`Você agora esta abrindo o Edit Mode, qualquer alteração feita feita em ${cardVt[Number(ind)].title} sobrescreverá a Tip.
            \nTem certeza que deseja abrir o Edit Mode?`);
    
    editMode(Number(ind));
    if(document.getElementById("tipOpn")){
            document.getElementById("tipOpn").outerHTML = "";}
    document.getElementById("editlay").style.display = "none";
    if(document.getElementById("vanderlay").style.display = "flex"){
        
        document.getElementById("vanderlay").style.display = "none";
    }
    document.getElementById("editlay").style.display = "flex";
}

export function cancelEditor(ind){
    if(confirm(`Gostaria de sair do Edit Mode? Todas as informações alteradas em ${cardVt[Number(ind)].title} não serão salvas`)){    
        document.getElementById("editlay").style.display = "none";
        document.getElementById("tipEditor").outerHTML = "";
        if(document.getElementById("vanderlay").style.display = "flex"){
            document.getElementById("vanderlay").style.display = "none";
        }
    }

}

export function doEditor(ind){
    if(confirm(`Tem certeza que deseja editar a tip ${cardVt[ind].title}? Qualquer alteração será mantida.`)){
        editing(editorInd);
        saveCards();
        updateScreem();
        document.getElementById("editlay").style.display = "none";
        document.getElementById("tipEditor").outerHTML = "";
        
        if(document.getElementById("vanderlay").style.display = "flex"){
            if(document.getElementById("tipOpn"))
                document.getElementById("tipOpn").outerHTML = "";
            document.getElementById("vanderlay").style.display = "none";
        }
    }
}