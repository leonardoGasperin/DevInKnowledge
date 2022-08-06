export const cardVt = [];
export let editorInd;


export default class Card{
    constructor(title, skill, cat, desc, hLink){
        this.title = title;
        this.skill = skill;
        this.cat = cat;
        this.desc = desc;
        this.hLink = chkLink(hLink);
    }

    makecard(obj = new Card(), i){
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
        cardSkill.className = "tipClass";
        cardCat.className = "tipClass";
        descAside.className = "tipAside";
        cardDesc.className = "desc";
        divBtn.id = "tipbtn";
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

        divBtn.append(btnDel);
        divBtn.append(btnEdit);
        divBtn.append(btnVideo);
        tipCard.append(divBtn);

        asideBx.appendChild(tipCard);

        overlayDiv.id = i;
        btnDel.name = i;
        btnEdit.name = i;
        tipCard.appendChild(overlayDiv);
    }

    openCard(obj = new Card(), i){

        const overDiv = document.getElementById("vanderlay");
        const opnTipDiv = document.createElement("div");
        const opnInfoDiv = document.createElement("div");
        const opnCardTitle = document.createElement("h4");
        const opnCardSkill = document.createElement("p");        
        const opnCardCat = document.createElement("p");
        const opnDivDesc = document.createElement("div");
        const opnCardDesc = document.createElement("p");
        const cardLink = document.createElement("div");
        const opnDivBtn = document.createElement("div");
        const opnBtnDel = document.createElement("button");
        const opnBtnEdit = document.createElement("button");

        opnTipDiv.id = "tipOpn";
        opnInfoDiv.id = "h4";
        opnCardSkill.className = "opnTipClass";
        opnCardCat.className = "opnTipClass";
        opnDivDesc.id = "opnP";
        opnCardDesc.className = "opnDesc";
        cardLink.id = "opnTipVideo";
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
            videoIframe.frameBorder = "0";//incorporar do youtube usa
            videoIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            videoIframe.allowFullscreen = true;

            cardLink.appendChild(videoIframe);
        }
        opnTipDiv.append(cardLink);

        opnTipDiv.append(opnDivBtn);
        opnDivBtn.append(opnBtnDel);
        opnDivBtn.append(opnBtnEdit);
    }

    saveTst(obj = new Card()){
        cardVt.push(obj);
    }
}

export function chkLink(url = new URL(), editChck = false){
    //console.log(url, url.origin, new URL("https://www.youtube.com").origin) //assert

    if(chrckUrl(url)){
        if(url != "" ){
            url = new URL(url);
            if(/*url.pathname.length < 6 ||*/ url.pathname != "/embed/.*")
            {
                console.log(url.pathname)
                if(url.origin == new URL("https://www.youtube.com").origin && url.pathname == "/watch"){
                    console.log("EMTRUO\t"+url.pathname)    
                    let link = "";
                    for(let i = 3; i < 14; i++)
                    {
                        link += url.search.charAt(i);
                    }
                    return url.origin + "/embed/" + link;
                }
                else if(url.origin == new URL("https://youtu.be").origin)
                {
                    //console.log("3")
                    let link = "https://www.youtube.com" + "/embed" + url.pathname

                    //console.log(link)
                    return link;
                }else{console.log("errou"+url); 
                    return url
                }
        }else{console.log(url); 
            return url;}
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
    const overDiv = document.getElementById("editlay");
    const opnTipDiv = document.createElement("div");
    const opnInfoDiv = document.createElement("div");
    const labelTitle = document.createElement("label");
    const opnCardTitle = document.createElement("input");
    const labelSkill = document.createElement("label");
    const opnCardSkill = document.createElement("input");        
    const labelCat = document.createElement("label");
    const opnCardCat = document.createElement("select");

    const fECat = document.createElement("option");
    const bECat = document.createElement("option");
    const fSCat = document.createElement("option");
    const stSCat = document.createElement("option");

    const labelDesc = document.createElement("label");
    const opnDivDesc = document.createElement("div");
    const opnCardDesc = document.createElement("textarea");
    const cardLinkDiv = document.createElement("div");
    const labelLink = document.createElement("label");
    const cardLink = document.createElement("input")
    const opnDivBtn = document.createElement("div");
    const opnBtnDel = document.createElement("button");
    const opnBtnEdit = document.createElement("button");

    opnTipDiv.id = "tipEditor";
    opnInfoDiv.id = "h4";

    labelTitle.htmlFor = "labelTitle";
    opnCardTitle.name = "labelTitle";
    opnCardTitle.id = "labelTitle";
    labelTitle.innerHTML = "Titulo";

    labelSkill.htmlFor = "labelSkill";
    opnCardSkill.name = "labelSkill";
    opnCardSkill.id = "labelSkill";
    opnCardSkill.className = "opnTipClass";
    labelSkill.innerHTML ="Skill";
    
    labelCat.htmlFor = "labelCat";
    opnCardCat.name = "labelCat";
    opnCardCat.id = "labelCat";
    opnCardCat.className = "opnTipClass";
    labelCat.innerHTML = "Categoria"

    opnDivDesc.id = "opnP";
    labelDesc.htmlFor = "labelDesc";
    opnCardDesc.name = "labelDesc";
    opnCardDesc.id = "labelDesc";
    opnCardDesc.className = "opnDesc";
    labelDesc.innerHTML = "Descrição";
    
    cardLinkDiv.id = "opnTipVideo";
    labelLink.htmlFor = "labelLink";
    cardLink.name = "labelLink";
    cardLink.id = "labelLink";
    labelLink.innerHTML = "Compartilhe um video(Youtube)";

    opnDivBtn.id = "opnTipbtn";
    opnBtnDel.className = "tipbtn";
    opnBtnDel.name = i;
    opnBtnDel.id = "delEditor";
    opnBtnEdit.className = "tipbtn";
    opnBtnEdit.name = i;
    opnBtnEdit.id = "editEditor";

    opnCardTitle.minLength= 8;
    opnCardTitle.maxlength = 16;
    opnCardTitle.required = true;
    opnCardTitle.value = cardVt[i].title;
    opnInfoDiv.append(labelTitle);
    opnInfoDiv.append(opnCardTitle);
    opnTipDiv.append(opnInfoDiv)
    overDiv.appendChild(opnTipDiv)

    opnCardTitle.minLength= 2;
    opnCardTitle.maxlength = 16;
    opnCardTitle.required = true;
    opnCardSkill.value = cardVt[i].skill;
    opnInfoDiv.append(labelSkill);
    opnInfoDiv.append(opnCardSkill);

    fECat.innerHTML = "FrontEnd";
    opnCardCat.appendChild(fECat);
    bECat.innerHTML = "BackEnd";
    opnCardCat.appendChild(bECat);
    fSCat.innerHTML = "FullStack";
    opnCardCat.appendChild(fSCat);
    stSCat.innerHTML = "SoftSkill";
    opnCardCat.appendChild(stSCat);
    opnInfoDiv.append(labelCat);
    opnInfoDiv.append(opnCardCat);

    opnCardDesc.minLength= 16;
    opnCardDesc.maxlength = 1024;
    opnCardDesc.style.resize = "none";
    opnTipDiv.append(opnDivDesc);
    opnCardDesc.value = cardVt[i].desc;
    opnDivDesc.append(labelDesc);
    opnDivDesc.append(opnCardDesc);

    cardLink.type = "url";
    if(cardVt[i].hLink != true)
        cardLink.value = cardVt[i].hLink;
    else
        cardLink.value = "";
    cardLinkDiv.appendChild(labelLink);
    cardLinkDiv.appendChild(cardLink);
    opnTipDiv.append(cardLinkDiv);
    
    opnTipDiv.append(opnDivBtn);
    opnDivBtn.append(opnBtnDel);
    opnDivBtn.append(opnBtnEdit);
    
    makeEditorInd(i);
}

export function editing(i){
    if(typeof i == "number"){
        cardVt[i].title = document.getElementById("labelTitle").value;
        cardVt[i].skill = document.getElementById("labelSkill").value;
        cardVt[i].cat = document.getElementById("labelCat").value;
        cardVt[i].desc = document.getElementById("labelDesc").value;

        if(!chrckUrl(document.getElementById("labelLink").value))
        document.getElementById("labelLink").value = "";
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