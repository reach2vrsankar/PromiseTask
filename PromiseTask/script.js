fetch("https://restcountries.eu/rest/v2/all").then((resp)=>{
    return resp.json();
})
.then((data)=>{
    Foo(data);
})
.catch((err)=>{
    console.log(err);
})

function Foo(params){
    var container = createEle('div','container');
    var row = createEle('div','row');
    params.forEach(obj=>{       
        var col = createEle('div','col-lg-4 mt-4');
        var card = createEle('div','card');
        card.style.width="18rem";
        var card_header = createEle('div','card-header text-center font-weight-bold bg-dark text-white')
        card_header.innerHTML=obj.name;
        var card_body = createEle('div','card-body text-center text-light');
        card_body.style.backgroundImage ='linear-gradient(to right, #d8c6a1 15% , #435553)';
        var card_img = createEle('div','align-self-center m-1');        
        var img = createEle('img','card-img-top mb-2');
        img.setAttribute('src',obj.flag);
        img.style.height='10rem';
        card_img.appendChild(img);        
        var capital = createEle('h5','card-title');
        capital.innerHTML="Capital: "+obj.capital;
        var region = createEle('h5','card-title');
        region.innerHTML="Region: "+obj.region;
        var country_code = createEle('h5','card-title');
        country_code.innerHTML="Country Code: "+obj.alpha3Code;
        var wether_btn = createEle('button','btn btn-light text-light ',`${obj.alpha3Code}`);
        wether_btn.innerHTML="Wheather check";
        wether_btn.style.background="none";
        wether_btn.setAttribute('onclick',`weather(this.id,${obj.latlng})`);
        card_body.append(card_img,capital,region,country_code,wether_btn);        
        var footer = createEle('div','card-footer font-weight-bold text-center text-light',`fotter_${obj.alpha3Code}`);
        footer.style.backgroundImage ='linear-gradient(to right, #d8c6a1 15% , #435553)';
        footer.style.height="50px";
        footer.innerHTML="";
        card.append(card_header,card_body,footer)
        // card.append(img,card_body,card_header);
        col.appendChild(card);        
        row.append(col);
        container.append(row);
        
    })
    document.body.appendChild(container);
    
}

function createEle(element,elemClass='',elemId=''){
    var element = document.createElement(element);
    element.setAttribute('class',elemClass);
    element.setAttribute('id',elemId);
return element;
}

function weather(id,lan1,lan2){
    
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lan1+'&lon='+lan2+'&appid=1ca1437f8d9685f11cdb5d094a3ae938')
    .then((resp)=>{
        return resp.json();
    })
    .then((data)=>{
        var table_container = document.querySelector("#fotter_"+id);
        table_container.innerHTML="Weather : "+data.weather[0].description;  
        setTimeout(function(){
            table_container.innerHTML='';
        },2000)
    })
    .catch((error)=>{
        console.log(error);
    })
}
