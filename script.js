function adminLogin(){
  const pass = prompt("أدخل كلمة السر:");
  if(pass === "20025"){
    window.location.href = "dashboard.html";
  } else {
    alert("كلمة السر غير صحيحة");
  }
}
function enterViewer(){
  window.location.href = "viewer.html";
}

function showAddForm(){document.getElementById("addForm").classList.remove("hidden");}
function closeForm(){document.getElementById("addForm").classList.add("hidden");}

function saveItem(){
  const name = document.getElementById("nameInput").value;
  const id = document.getElementById("idInput").value;
  const category = document.getElementById("categoryInput").value;
  const expire = document.getElementById("expireInput").value;
  const imageFile = document.getElementById("imageInput").files[0];
  if(!name || !id || !expire){alert("الرجاء تعبئة جميع الحقول");return;}
  const reader = new FileReader();
  reader.onload = function(e){
    const item = {name,id,category,expire,image:e.target.result};
    let items = JSON.parse(localStorage.getItem("insurance_items")||"[]");
    items.push(item);
    localStorage.setItem("insurance_items",JSON.stringify(items));
    renderItems();
    closeForm();
  }
  if(imageFile){reader.readAsDataURL(imageFile);} else {
    const item = {name,id,category,expire,image:""};
    let items = JSON.parse(localStorage.getItem("insurance_items")||"[]");
    items.push(item);
    localStorage.setItem("insurance_items",JSON.stringify(items));
    renderItems();
    closeForm();
  }
}

function renderItems(){
  const container = document.getElementById("cardsContainer");
  if(!container) return;
  container.innerHTML="";
  let items = JSON.parse(localStorage.getItem("insurance_items")||"[]");
  items.forEach((item,i)=>{
    const card=document.createElement("div");
    card.className="card-item";
    const img=item.image?`<img src="${item.image}" alt="صورة">`:"";
    const diff=new Date(item.expire)-new Date();
    let countdown;
    if(diff>0){
      const days=Math.ceil(diff/(1000*60*60*24));
      countdown=`<div class='countdown'>باقي ${days} يوم</div>`;
    } else {
      countdown=`<div class='countdown expired'>تم انتهاء التأمين</div>`;
    }
    card.innerHTML=`${img}<h3>${item.name}</h3><p>${item.id}</p><p>${item.category}</p>${countdown}`;
    container.appendChild(card);
  });
}
document.addEventListener("DOMContentLoaded",renderItems);
