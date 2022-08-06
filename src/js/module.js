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
        }else
            btnSv.disabled = true;
    
    if(document.getElementById("editEditor"))
    {
        if(document.getElementById("labelTitle").value != "" && document.getElementById("labelTitle").value != undefined  && document.getElementById("labelTitle").value.length >= 8 &&
                         document.getElementById("labelSkill").value != "" && document.getElementById("labelSkill").value.length >= 2
                         && (document.getElementById("labelDesc").value == "" || document.getElementById("labelDesc").value.length >= 16)
                         && (chkLink(document.getElementById("labelLink").value, true) ||  document.getElementById("labelLink").value == ""))
        {
            document.getElementById("editEditor").disabled = false;
        }else{
            document.getElementById("editEditor").disabled = true;
        }
    }
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
    ///TODO
      //mudar para switch()
    if(e.target.className == "overlay"){
        cardVt[Number(e.target.id)].openCard(cardVt[Number(e.target.id)], e.target.id);
        document.getElementById("vanderlay").style.display = "flex";
        cardVt[Number(e.target.id)]
    }
    else if(e.target.id == "vanderlay"){
        document.getElementById("tipOpn").outerHTML = "";
        document.getElementById("vanderlay").style.display = "none";
    }
    else if(e.target.id == "del"){
        if(confirm(`reamente deseja deletar a Tip ${cardVt[Number(e.target.name)].title}`)){
            deleteFromList(Number(e.target.name));
            saveCards();
            if(document.getElementById("vanderlay").style.display == "flex"){
                document.getElementById("tipOpn").outerHTML = "";
                document.getElementById("vanderlay").style.display = "none";
            }
            updateScreem();
        }
    }
    else if(e.target.id == "edit"){
        alert(`Você agora esta abrindo o Edit Mode, qualquer alteração feita feita em ${cardVt[Number(e.target.name)].title} sobrescreverá a Tip.\nTem certeza que deseja abrir o Edit Mode?`);
        editMode(Number(e.target.name));
        if(document.getElementById("tipOpn")){
            console.log(e.target.id)
                document.getElementById("tipOpn").outerHTML = "";}
        document.getElementById("editlay").style.display = "none";
        if(document.getElementById("vanderlay").style.display = "flex"){
            
            document.getElementById("vanderlay").style.display = "none";
        }
        document.getElementById("editlay").style.display = "flex";
    }
    else if(e.target.id == "delEditor"){
        if(confirm(`Gostaria de sair do Edit Mode? Todas as informações alteradas em ${cardVt[Number(e.target.name)].title} não serão salvas`)){    
            document.getElementById("editlay").style.display = "none";
            document.getElementById("tipEditor").outerHTML = "";
            if(document.getElementById("vanderlay").style.display = "flex"){
                    document.getElementById("vanderlay").style.display = "none";
            }
    }

    }
    else if(e.target.id == "editEditor"){
        if(confirm(`Tem certeza que deseja editar a tip ${cardVt[e.target.name].title}? Qualquer alteração será mantida.`)){
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
    else if(e.target.id == "editlay" || e.target.id == "delEditor"){
        document.getElementById("tipEditor").outerHTML = "";
        console.log(document.getElementById("tipOpn"))
        
        updateScreem();
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
            saveCards();
            alert(`A tip ${title.value} foi salva com sucesso!`);
            video.value = ""
            updateScreem();
        }
    else{
        btnSv.disabled = true;
    }
})

document.getElementById("forms").addEventListener("submit", (e) => {
    e.preventDefault();
    title.value = "";
    skill.value = "";
    category.selectedIndex = 0;
    desc.value = "";
    video.value = "";  
})

function updateScreem(){
    document.getElementById("tipBoard").innerHTML = "";
    const totalVl = document.getElementById("total");
    const frontVl = document.getElementById("fE");
    const backVl = document.getElementById("bE");
    const fullStcVl = document.getElementById("fS");
    const softVl = document.getElementById("stS");

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

function saveCards(){
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
            // console.log(element.hLink)
            // console.log(chkLink(element.hLink))
            
            cardVt.push(new Card(element.title, element.skill, element.cat, element.desc, element.hLink));
        });
    }
}

updateScreem();