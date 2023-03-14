let currentpage=0;
let size=10;
let scrollable=document.querySelector(".scrollable")
let ApiUrl='https://api.instantwebtools.net/v1/passenger'
let isScrollable=true
const getdata=()=>{
    document.querySelector('.scrollable').innerHTML+=`<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
    fetch(`${ApiUrl}?page=${currentpage}&size=${size}`)
    .then(res=>res.json())
    .then(data=>{
        render(data.data,currentpage)
        // console.log(data);
        currentpage++;
        isScrollable=true
    })
}


scrollable.addEventListener('scroll',(e)=>{
    let target=e.target
    
    const {scrollHeight,offsetHeight,scrollTop}=target
    if ((offsetHeight+scrollTop)>= scrollHeight*0.90){
        if(isScrollable){
            // console.log("it near bottom");
            getdata()
            isScrollable=false
        }
    }

})
const render=(data,currentpage)=>{
    
    if(data){
        document.querySelector('.pageNumberDis').innerText=currentpage+1
        let tmp="";
        data.forEach(item=>{
            // console.log(item);
            tmp+=
            `
            <div class="content">
            <div class="title">
                <img src="${item.airline[0].logo}" alt="${item.airline[0].name}"> 
                <h1>:</h1>
                <h1>${item.airline[0].name}</h1>
            </div>
            <div class="bodyContent">
                <p>😊: ${item.name}</p>
            </div>
           </div>
            `
        })
        document.querySelector('.scrollable').innerHTML+=tmp
        document.querySelector('.lds-roller').remove()
    }
}

window.addEventListener('load',(e)=>{
    getdata()
})