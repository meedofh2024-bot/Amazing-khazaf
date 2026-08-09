const products=[
{id:1,name:"طقم شاي خزفي ملون",price:0,cat:"sets",Img:"Images/product-1.jpg",desc:"طقم مغربي مزخرف بألوان زاهية وتفاصيل تقليدية."},
{id:2,name:"طقم خزفي أزرق وأبيض",price:400,cat:"sets",Img:"Images/product-2.jpg",desc:"تصميم أزرق وأبيض مستوحى من الزخرفة المغربية."},
{id:3,name:"موزع ماء خزفي أخضر",price:389,cat:"dispenser",Img:"Images/product-3.jpg",desc:"موزع ماء خزفي بلمسة خضراء وزخارف يدوية."},
{id:4,name:"موزع ماء خزفي بني",price:389,cat:"dispenser",Img:"Images/product-4.jpg",desc:"موزع أنيق بلون بني وزخارف نباتية."},
{id:5,name:"أواني خزفية متنوعة",price:0,cat:"sets",Img:"Images/product-5.jpg",desc:"مجموعة من الأواني المغربية المزخرفة بألوان متعددة."},
{id:6,name:"طقم خزفي أزرق مزخرف",price:435,cat:"decor",Img:"Images/product-6.jpg",desc:"قطعة خزفية مميزة للضيافة والديكور."},
{id:7,name:"أكواب شاي خزفية",price:0,cat:"cups",Img:"Images/product-7.jpg",desc:"أكواب شاي مغربية مزخرفة مع الصحون."}
];

let cart=JSON.parse(localStorage.getItem("amazingKhazafCart")||"[]");

function renderProducts(){
 const c=document.getElementById("category").value;
 const list=products.filter(p=>c==="all"||p.cat===c);
 document.getElementById("productsGrid").innerHTML=list.map(p=>`
 <article class="card">
   <img class="product-image" src="${p.img}" alt="${p.name}">
   <div class="card-body">
     <h3>${p.name}</h3><p>${p.desc}</p>
     <div class="price">${p.price ? p.price+" درهم" : "الثمن عند الطلب"}</div>
     <button class="primary add" onclick="addToCart(${p.id})">أضف إلى السلة</button>
   </div>
 </article>`).join("");
}
function addToCart(id){const x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();renderCart();toggleCart(true)}
function save(){localStorage.setItem("amazingKhazafCart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.reduce((s,i)=>s+i.qty,0)}
function renderCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML="<p>السلة فارغة.</p>";document.getElementById("total").textContent=0;return}
 box.innerHTML=cart.map(i=>{const p=products.find(x=>x.id===i.id);return `<div class="cart-item"><div><strong>${p.name}</strong><br>${p.price ? p.price*i.qty+" درهم" : "الثمن عند الطلب"}</div><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button> ${i.qty} <button onclick="changeQty(${p.id},1)">+</button></div></div>`}).join("");
 const known=cart.reduce((s,i)=>s+(products.find(p=>p.id===i.id).price*i.qty),0);
 document.getElementById("total").textContent=known;
}
function changeQty(id,d){const x=cart.find(i=>i.id===id);x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save();renderCart()}
function toggleCart(force){const c=document.getElementById("cart"),o=document.getElementById("overlay");const open=force===true||!c.classList.contains("open");c.classList.toggle("open",open);o.classList.toggle("open",open)}
function checkout(){
 if(!cart.length)return alert("السلة فارغة");
 const lines=cart.map(i=>{const p=products.find(x=>x.id===i.id);return `- ${p.name} × ${i.qty}`}).join("%0A");
 const known=cart.every(i=>products.find(p=>p.id===i.id).price>0);
 const total=cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);
 const msg=`السلام عليكم، بغيت نطلب:%0A${lines}%0A${known?"المجموع: "+total+" درهم":"بغيت نعرف الأثمنة والتفاصيل ديال هاد المنتجات."}`;
 window.open(`https://wa.me/212705667131?text=${msg}`,"_blank");
}
renderProducts();save();renderCart();
