export const cardVt = [];

export default class Card{
    constructor(title, skill, cat, desc, hLink){
        this.title = title;
        this.skill = skill;
        this.cat = cat;
        this.desc = desc;
        this.hLink = hLink;
    }

    makecard(obj = new Card()){
        const asideBx = document.getElementById("tipBoard");
        const overlayDiv = document.createElement("div");
        const tipCard = document.createElement("div");
        const cardTitle = document.createElement("h4");
        const cardSkill = document.createElement("p");        
        const cardCat = document.createElement("p");
        const descAside = document.createElement("aside");
        const cardDesc = document.createElement("p");
        //        const cardLink = document.createElement("??");
        const divBtn = document.createElement("div");
        const btnDel = document.createElement("button");
        const btnEdit = document.createElement("button");;
        const btnVideo = document.createElement("button");

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

        tipCard.append(overlayDiv);

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

        divBtn.append(btnDel);
        divBtn.append(btnEdit);
        divBtn.append(btnVideo);
        tipCard.append(divBtn);

        asideBx.appendChild(tipCard);

        this.saveTst(this);

        overlayDiv.id = (cardVt.length - 1).toString();
    }

    saveTst(obj = new Card()){
        cardVt.push(obj);
    }

    openCard(){
        console.log("ABRIU!")
    }
}