/**toda montagem de cartões é feita aqui */
export const cardVt = [];//vetor onde guarda os tip cards
export let editorInd;//referencia do valor do index na lista cardVt


export default class TipCard{
    constructor(title, skill, cat, desc, hLink){
        this.title = title;
        this.skill = skill;
        this.cat = cat;
        this.desc = desc;
        this.hLink = chkLink(hLink);
    }

    makecard(obj = new TipCard(), i){//montagem do cartão basico(fechado/painel da direita)
        //cria/prepara elementos html
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

        //atribui seus dividos id e classe
        overlayDiv.className = "overlay";
        tipCard.className = "tip";
        cardSkill.className = "tipP";
        cardCat.className = "tipP";
        descAside.className = "AsideDesc";
        cardDesc.className = "desc";
        divBtn.id = "tipBtnDiv";
        btnDel.className = "tipbtn";
        btnDel.id = "del";
        btnEdit.className = "tipbtn";
        btnEdit.id = "edit";
        btnVideo.className = "tipbtn";
        btnVideo.id = "video";

        //monta elementos html do cartão
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

        //adiciona referencia do elemento no array
        overlayDiv.id = i;//abrir cartao
        btnDel.name = i;//deleta cartao
        btnEdit.name = i;//edita cartao
        tipCard.appendChild(overlayDiv);
    }

    openCard(obj = new TipCard(), i){//montagem do cartão aberto
        //criam/prepara elementos html
        const overDiv = document.getElementById("vanderlay");
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

        //atribui seus devidos id e classe
        opnTipDiv.id = "tipOpn";
        opnInfoDiv.id = "titleOpenCard";
        opnCardSkill.className = "opnTipP";
        opnCardCat.className = "opnTipP";
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

        //monta elementos html do cartão aberto
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

        if(obj.hLink != "" && obj.hLink != true){//youtube doa este codigo em sua area de PC->compartilhamento->incorporar, porem na escrita do HTML
            const videoIframe = document.createElement("iframe");
            videoIframe.width = "560";
            videoIframe.height= "315";
            videoIframe.src = obj.hLink;
            videoIframe.title = "YouTube video player";
            videoIframe.frameBorder = "0";//incorporar do youtube usa
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

//não, não usei regex
export function chkLink(url = new URL(), editChck = false){//checa se é um link do youtube e monta o link embed para fazer o iframe do cartao aberto
    //assert
        //console.log(url, new URL("https://www.youtube.com").origin)
    
    //checa se é um URL
    if(chrckUrl(url)){
        if(url != "" ){
            url = new URL(url);
            if(url.pathname != "/embed/.*"){//necessario, caso queira tirar ou trocar link do video ou manter, sem perder o dado de search do link, ao ter loads
                if(url.origin == new URL("https://www.youtube.com").origin && url.pathname == "/watch")
                {//checa se é link da barra de url do navegador
                    let link = "";

                    for(let i = 3; i < 14; i++)
                    {//pega somente valor necessario para search do link
                        link += url.search.charAt(i);
                    }

                    //retorna link embed para iframe do cartão aberto
                    return url.origin + "/embed/" + link;
                }//caso nao seja link wtach, checa se nao é link de compartilhamento
                else if(url.origin == new URL("https://youtu.be").origin)
                {//monta o link enbed para iframe do cartão aberto

                    let link = "https://www.youtube.com" + "/embed" + url.pathname

                    return link;
                }else{//caso contrarop
                    if(url.origin == new URL("https://www.youtube.com").origin)
                    {//para edição, caso usuario nao edite alguma url ja existente
                        return url;
                    }
                    return false;
                }
            }else{//para o load, caso o link youtube ja seja embed nao o altera
                return url;
            }
        }else//aceita campo vazio para salvar e editar.
            return true
    }else{//caso nao seja URL manda false para edit e true para criar cartão
        if(editChck)
            return false;
        else
            return true;//se nao for um link nao salvara nada.
    }
}

/** OBS:
  * este "cartão" de modo de edição leva com ele nomes basicos
  * de elementos do cartão aberto pois ele é exatamente uma
  * copia do cartão aberto utilizando o mesmo CSS */ 
export function editMode(i){//montagem do cartão para edição
    //cria/prepara elementos html
    const overDiv = document.getElementById("editlay");
    const editTipDiv = document.createElement("div");
    const editInfoDiv = document.createElement("div");
    const labelTitle = document.createElement("label");
    const editCardTitle = document.createElement("input");
    const labelSkill = document.createElement("label");
    const editCardSkill = document.createElement("input");        
    const labelCat = document.createElement("label");
        //criando/preparando o select das categorias
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

    //atribui seus devidos id, classe e nome, como tambem injetando texto nas label's
    editTipDiv.id = "tipEditor";
    editInfoDiv.id = "titleOpenCard";

    labelTitle.htmlFor = "labelTitle";
    editCardTitle.name = "labelTitle";
    editCardTitle.id = "labelTitle";
    labelTitle.innerHTML = "Titulo";

    labelSkill.htmlFor = "labelSkill";
    editCardSkill.name = "labelSkill";
    editCardSkill.id = "labelSkill";
    editCardSkill.className = "opnTipP";
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
    labelDesc.innerHTML = "Descrição";
    
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

    //monta elementos html do cartão de edição
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
    
    makeEditorInd(i);//apos a criar o ambiente de edição registra qual item do cardVt sera editado;
}

export function editing(i){
    if(typeof i == "number"){//se makeEditorInd(i) for um numero as data do item recebe os novos valores.
        cardVt[i].title = document.getElementById("labelTitle").value;
        cardVt[i].skill = document.getElementById("labelSkill").value;
        cardVt[i].cat = document.getElementById("labelCat").value;
        cardVt[i].desc = document.getElementById("labelDesc").value;

        if(!chrckUrl(document.getElementById("labelLink").value)){//checa se não é um link do youtube 
            cardVt[i].hLink = "";
        }else
            cardVt[i].hLink = document.getElementById("labelLink").value;
        
        document.getElementById("labelLink").value = "";
        i = undefined;//por segurança depois daqui nao edita mais sem dar inicio a edição.
    }
}

export function deleteFromList(i){
    cardVt.splice(i, 1);
}

//referencia(index) de quem sera editado
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