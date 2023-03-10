export const cardVt = [];
export let editorInd;

export default class TipCard{
    constructor(title, skill, cat, desc, hLink){
        this.title = title;
        this.skill = skill;
        this.cat = cat;
        this.desc = desc;
        this.hLink = chkLink(hLink);
    }

    makecard(obj = new TipCard(), i){
        const asideBx = document.getElementById("tipBoard");
        const overlayDiv = document.createElement("div");
        const tipCard = document.createElement("div");
        const cardTitle = document.createElement("h4");
        const cardSkill = document.createElement("p");        
        const cardCat = document.createElement("p");
        const descAside = document.createElement("aside");
        const cardDesc = document.createElement("p");
        const divBtn = document.createElement("div");
        const btnDel = document.createElement("button");
        const btnEdit = document.createElement("button");
        const btnVideo = document.createElement("a");

        overlayDiv.className = "overlay";
        tipCard.className = "tip";
        cardSkill.className = "tipSkill";
        cardCat.className = "tipSkill";
        descAside.className = "AsideDesc";
        cardDesc.className = "desc";
        divBtn.id = "tipBtnDiv";
        btnDel.className = "tipbtn";
        btnDel.id = "del";
        btnEdit.className = "tipbtn";
        btnEdit.id = "edit";
        btnVideo.className = "tipbtn";
        btnVideo.id = "video";

        cardTitle.innerHTML = obj.title;
        tipCard.append(cardTitle);

        const strongSkill = document.createElement("strong");
        strongSkill.innerText = "Skill: ";
        cardSkill.append(strongSkill);
        cardSkill.innerHTML += obj.skill;
        tipCard.append(cardSkill);
        
        const strongCat = document.createElement("strong");
        strongCat.innerText = "Categoria: ";
        cardCat.append(strongCat);
        cardCat.innerHTML += obj.cat;
        tipCard.append(cardCat);

        cardDesc.innerHTML = obj.desc;
        descAside.append(cardDesc);
        tipCard.append(descAside);

        const btn = document.createElement("button");
        btn.id = "videoBtn";
        if(obj.hLink != "" && obj.hLink != true){
            btnVideo.href = obj.hLink;
            btnVideo.target = "_blank";
            btnVideo.rel = "noopener noreferrer";
        }
        btnVideo.appendChild(btn)
        btnDel.innerHTML = "Del";
        divBtn.append(btnDel);
        btnEdit.innerHTML = "Edit";
        divBtn.append(btnEdit);
        btn.innerHTML = "Ytube";
        divBtn.append(btnVideo);
        tipCard.append(divBtn);

        asideBx.appendChild(tipCard);

        overlayDiv.id = i;
        btnDel.name = i;
        btnEdit.name = i;
        tipCard.appendChild(overlayDiv);
    }

    openCard(obj = new TipCard(), i){
        const overDiv = document.getElementById("openOverlay");
        const opnTipDiv = document.createElement("div");
        const opnInfoDiv = document.createElement("div");
        const opnCardTitle = document.createElement("h4");
        const opnCardSkill = document.createElement("p");        
        const opnCardCat = document.createElement("p");
        const opnDivDesc = document.createElement("div");
        const opnCardDesc = document.createElement("p");
        const opnCardLink = document.createElement("div");
        const opnDivBtn = document.createElement("div");
        const opnBtnDel = document.createElement("button");
        const opnBtnEdit = document.createElement("button");

        opnTipDiv.id = "tipOpen";
        opnInfoDiv.id = "titleOpenCard";
        opnCardSkill.className = "tipOpenCard";
        opnCardCat.className = "tipOpenCard";
        opnDivDesc.id = "opnDescDiv";
        opnCardDesc.className = "opnDesc";
        opnCardLink.id = "opnTipVideo";
        opnDivBtn.id = "opnTipbtn";
        opnBtnDel.className = "tipbtn";
        opnBtnDel.name = i;
        opnBtnDel.id = "del";
        opnBtnEdit.className = "tipbtn";
        opnBtnEdit.name = i;
        opnBtnEdit.id = "edit";

        opnCardTitle.innerHTML = obj.title;
        opnInfoDiv.append(opnCardTitle);
        opnTipDiv.append(opnInfoDiv)
        overDiv.appendChild(opnTipDiv)

        const strongSkill = document.createElement("strong");
        strongSkill.innerText = "Skill: ";
        opnCardSkill.append(strongSkill);
        opnCardSkill.innerHTML += obj.skill;
        opnInfoDiv.append(opnCardSkill);
        
        const strongCat = document.createElement("strong");
        strongCat.innerText = "Categoria: ";
        opnCardCat.append(strongCat);
        opnCardCat.innerHTML += obj.cat;
        opnInfoDiv.append(opnCardCat);

        opnTipDiv.append(opnDivDesc);
        opnCardDesc.innerHTML = obj.desc;
        if(opnCardDesc.style.height >= 330)
            opnTipDiv.style.overflowY = "scroll";
        else
            opnTipDiv.style.overflowY = "none";
        opnDivDesc.append(opnCardDesc);

        if(obj.hLink != "" && obj.hLink != true){
            const videoIframe = document.createElement("iframe");
            videoIframe.width = "560";
            videoIframe.height= "315";
            videoIframe.src = obj.hLink;
            videoIframe.title = "YouTube video player";
            videoIframe.frameBorder = "0";
            videoIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            videoIframe.allowFullscreen = true;

            opnCardLink.appendChild(videoIframe);
        }
        opnTipDiv.append(opnCardLink);

        opnTipDiv.append(opnDivBtn);
        opnBtnDel.innerHTML = "Del";
        opnDivBtn.append(opnBtnDel);
        opnBtnEdit.innerHTML = "Edit";
        opnDivBtn.append(opnBtnEdit);
    }

    saveCardList(obj = new TipCard()){
        cardVt.push(obj);
    }
}

export function chkLink(url = new URL(), editChck = false){
    if(chrckUrl(url)){
        if(url != "" ){
            url = new URL(url);
            if(url.pathname != "/embed/.*"){
                if(url.origin == new URL("https://www.youtube.com").origin && url.pathname == "/watch")
                {
                    let link = "";

                    for(let i = 3; i < 14; i++)
                    {
                        link += url.search.charAt(i);
                    }

                    return url.origin + "/embed/" + link;
                }
                else if(url.origin == new URL("https://youtu.be").origin)
                {
                    let link = "https://www.youtube.com" + "/embed" + url.pathname

                    return link;
                }else{
                    if(url.origin == new URL("https://www.youtube.com").origin)
                    {
                        return url;
                    }
                    return false;
                }
            }else{
                return url;
            }
        }else
            return true
    }else{
        if(editChck)
            return false;
        else
            return true;
    }
}

export function editMode(i){
    const overDiv = document.getElementById("openOverlay");
    const editTipDiv = document.createElement("div");
    const editInfoDiv = document.createElement("div");
    const labelTitle = document.createElement("label");
    const editCardTitle = document.createElement("input");
    const labelSkill = document.createElement("label");
    const editCardSkill = document.createElement("input");        
    const labelCat = document.createElement("label");
   
    const editCardCat = document.createElement("select");
    const fECat = document.createElement("option");//fE frontEnd
    const bECat = document.createElement("option");//bE backEnd
    const fSCat = document.createElement("option");//fS fullStack
    const stSCat = document.createElement("option");//stS softSkill

    const labelDesc = document.createElement("label");
    const editDivDesc = document.createElement("div");
    const editCardDesc = document.createElement("textarea");
    const cardLinkDiv = document.createElement("div");
    const labelLink = document.createElement("label");
    const cardLink = document.createElement("input")
    const editDivBtn = document.createElement("div");
    const editBtnDel = document.createElement("button");
    const editBtnEdit = document.createElement("button");

    editTipDiv.id = "tipOpen";
    editInfoDiv.id = "titleOpenCard";

    labelTitle.htmlFor = "labelTitle";
    editCardTitle.name = "labelTitle";
    editCardTitle.id = "labelTitle";
    labelTitle.innerHTML = "Titulo";

    labelSkill.htmlFor = "labelSkill";
    editCardSkill.name = "labelSkill";
    editCardSkill.id = "labelSkill";
    editCardSkill.className = "tipOpenCard";
    labelSkill.innerHTML ="Skill";
    
    labelCat.htmlFor = "labelCat";
    editCardCat.name = "labelCat";
    editCardCat.id = "labelCat";
    editCardCat.className = "opnTipClass";
    labelCat.innerHTML = "Categoria"

    editDivDesc.id = "opnDescDiv";
    labelDesc.htmlFor = "labelDesc";
    editCardDesc.name = "labelDesc";
    editCardDesc.id = "labelDesc";
    editCardDesc.className = "opnDesc";
    labelDesc.innerHTML = "Descri????o";
    
    cardLinkDiv.id = "opnTipVideo";
    labelLink.htmlFor = "labelLink";
    cardLink.name = "labelLink";
    cardLink.id = "labelLink";
    labelLink.innerHTML = "Compartilhe um video(Youtube)";

    editDivBtn.id = "opnTipbtn";
    editBtnDel.className = "tipbtn";
    editBtnDel.name = i;
    editBtnDel.id = "delEditor";
    editBtnEdit.className = "tipbtn";
    editBtnEdit.name = i;
    editBtnEdit.id = "editEditor";

    editCardTitle.minLength= 8;
    editCardTitle.maxlength = 16;
    editCardTitle.required = true;
    editCardTitle.value = cardVt[i].title;
    editInfoDiv.append(labelTitle);
    editInfoDiv.append(editCardTitle);
    editTipDiv.append(editInfoDiv)
    overDiv.appendChild(editTipDiv)

    editCardTitle.minLength= 2;
    editCardTitle.maxlength = 16;
    editCardTitle.required = true;
    editCardSkill.value = cardVt[i].skill;
    editInfoDiv.append(labelSkill);
    editInfoDiv.append(editCardSkill);

    fECat.innerHTML = "FrontEnd";
    editCardCat.appendChild(fECat);
    bECat.innerHTML = "BackEnd";
    editCardCat.appendChild(bECat);
    fSCat.innerHTML = "FullStack";
    editCardCat.appendChild(fSCat);
    stSCat.innerHTML = "SoftSkill";
    editCardCat.appendChild(stSCat);
    editInfoDiv.append(labelCat);
    editInfoDiv.append(editCardCat);

    editCardDesc.minLength= 16;
    editCardDesc.maxlength = 1024;
    editCardDesc.style.resize = "none";
    editTipDiv.append(editDivDesc);
    editCardDesc.value = cardVt[i].desc;
    editDivDesc.append(labelDesc);
    editDivDesc.append(editCardDesc);

    cardLink.type = "url";
    if(cardVt[i].hLink != true)
        cardLink.value = cardVt[i].hLink;
    else
        cardLink.value = "";
    cardLinkDiv.appendChild(labelLink);
    cardLinkDiv.appendChild(cardLink);
    editTipDiv.append(cardLinkDiv);
    
    editTipDiv.append(editDivBtn);
    editBtnDel.innerHTML = "Cancelar";
    editDivBtn.append(editBtnDel);
    editBtnEdit.innerHTML = "Confirmar";
    editDivBtn.append(editBtnEdit);
    
    makeEditorInd(i);
}

export function editing(i){
    if(typeof i == "number"){
        cardVt[i].title = document.getElementById("labelTitle").value;
        cardVt[i].skill = document.getElementById("labelSkill").value;
        cardVt[i].cat = document.getElementById("labelCat").value;
        cardVt[i].desc = document.getElementById("labelDesc").value;

        if(!chrckUrl(document.getElementById("labelLink").value)){ 
            cardVt[i].hLink = "";
        }else
            cardVt[i].hLink = document.getElementById("labelLink").value;
        
        document.getElementById("labelLink").value = "";
        i = undefined;
    }
}

export function deleteFromList(i){
    cardVt.splice(i, 1);
}

function makeEditorInd(i){
    editorInd = i
}

function chrckUrl(value){
    try{
        let url = new URL(value)
        return true;
    }catch(error){
        return false;
    }
}