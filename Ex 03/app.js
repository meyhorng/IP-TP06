let currentpage=1;
let size=10;
let scrollable=document.querySelector(".scrollable")
let ApiUrl='https://api.punkapi.com/v2/beers'
let isScrollable=true
const getdata=()=>{
    document.querySelector('.scrollable').innerHTML+=`<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
    let data=window.localStorage.getItem(currentpage)
    data = JSON.parse(data)
    if(data){
        render(data,currentpage)
        isScrollable=true
        currentpage++;
    }else{
        fetch(`${ApiUrl}?page=${currentpage}&per_page=${size}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            save(currentpage,data)
            render(data,currentpage)
            // console.log(data);
            currentpage++;
            isScrollable=true
        })

        
    }
    
}


scrollable.addEventListener('scroll',(e)=>{
    let target=e.target
    
    const {scrollHeight,offsetHeight,scrollTop}=target
    if ((offsetHeight+scrollTop)>= scrollHeight*0.90){
        // console.log(isScrollable);
        if(isScrollable){
            // console.log("it near bottom");
            isScrollable=false
            getdata()
        }
    }

})
const render=(data,currentpage)=>{
    
    if(data){
        // document.querySelector('.pageNumberDis').innerText=currentpage+1
        let tmp="";
        data.forEach(item=>{
            // console.log(item);
            tmp+=
            `
            <div class="beer" data-id=${item.id}>
                <div class="icon">
                 <img src="https://i.ibb.co/Pzc6d2N/image.png" alt="beer_img">
                </div>
                <div class="infor">
                 <h1>${item.name}</h1>
                 <p>${item.tagline}</p>
                </div>

            </div>
            `
        })
        document.querySelector('.scrollable').innerHTML+=tmp
        document.querySelector('.lds-roller').remove()
        
    }
}

const save=(pageNum,data)=>{
    if(data){
        window.localStorage.setItem(pageNum,JSON.stringify(data))

    }
}


const renderView=(data)=>{
    if(data){
        document.querySelector('.pageNum').innerHTML=
        `
        <img src="${data.image_url}" alt="${data.name}-img">
        <div class="content">
            <div class="date">
            ${data.first_brewed}
            </div>
            <div class="descriotion">
            ${data.description}
            </div>
            <br>
            <div class="contributor">
                contributor
                <br>
                <span class="name">
                    <strong >  ${data.contributed_by}</strong>
                </span>
            </div>
        </div>
        `

    }
}

const getDataByID=(id)=>{
    document.querySelector('.pageNum').innerHTML=`<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
    fetch(`${ApiUrl}/${id}`)
    .then(res=> res.json())
    .then(data=>{
       renderView(data[0])
    })
}
// render()

scrollable.addEventListener('click',(e)=>{
   const target=e.target;
   if(target.classList.contains('beer')){
    clearAllClass()   
    target.classList.add('active')

    if(!isNaN(Number(getDataByID(target.getAttribute('data-id'))))){
        getDataByID(Number(getDataByID(target.getAttribute('data-id'))))
    }
   }
})
const clearAllClass=()=>{
    document.querySelectorAll('.beer').forEach(item=>{
        item.classList.remove('active')
    })
}

window.addEventListener('load',(e)=>{
    getdata()
})
