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
        const descAside = document.createElement("aside");
        const asideDiv = document.createElement("div");
        const cardTitle = document.createElement("h4");
        const cardSkill = document.createElement("p");        
        const cardCat = document.createElement("p");
        const cardDesc = document.createElement("p");
        //        const cardLink = document.createElement("??");
        const divBtn = document.createElement("div");
        const btnDel = document.createElement("button");
        const btnEdit = document.createElement("button");;
        const btnVideo = document.createElement("button");

        const strongSkill = document.createElement("strong");
        strongSkill.innerText = "Skill: ";
        const strongCat = document.createElement("strong");
        strongCat.innerText = "Categoria: ";
        
        asideDiv.className = "tip";
        descAside.className = "tipAside";
        cardSkill.className = "tipClass";
        cardCat.className = "tipClass";
        cardDesc.className = "desc";
        divBtn.id = "tipbtn";
        btnDel.className = "tipbtn";
        btnDel.id = "del";
        btnEdit.className = "tipbtn";
        btnEdit.id = "edit";
        btnVideo.className = "tipbtn";
        btnVideo.id = "video";

        cardTitle.innerHTML = obj.title;
        asideDiv.append(cardTitle);
        cardSkill.append(strongSkill);
        cardSkill.innerHTML += obj.skill;
        asideDiv.append(cardSkill);
        cardCat.append(strongCat);
        cardCat.innerHTML += obj.cat;
        asideDiv.append(cardCat);
        cardDesc.innerHTML = obj.desc;
        descAside.append(cardDesc);
        asideDiv.append(descAside);
        divBtn.append(btnDel);
        divBtn.append(btnEdit);
        divBtn.append(btnVideo);
        asideDiv.append(divBtn);
        asideBx.appendChild(asideDiv);

    }
}