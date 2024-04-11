const umbrellas = [
    {url:''},
    {url:''},
    {url:''},
    {url:'assets/Pink umbrella.png'},
    {url:'assets/Blue umbrella.png'},
    {url:'assets/Yello umbrella.png'},
    {url:''},
    {url:''},
]

let logo_url="";

// controller
const controller = document.querySelector('.controller');
const custom_color_selector = controller.querySelector('.custom-color-selector');

// customiser button
const logo_input = document.querySelector('input#logo');
const upload_button = document.querySelector('.upload');
const upload_icon = upload_button.querySelector('.upload-icon');
const upload_button_text = upload_button.querySelector('#button-text');
const upload_close = upload_button.querySelector('.close');
// umbrella
const umbrella_container = document.querySelector('.umbrella-container');
const umbrella = umbrella_container.querySelector('.umbrella');
const logo = umbrella_container.querySelector('.logo');

umbrella.onload = () => {
    console.log('loaded');
    umbrella_container.classList.remove('loading');
}
logo.onload = () =>{
    setTimeout(()=>{
        umbrella_container.classList.remove('logo-loading');
        upload_button.classList.remove('loading');
    },1000)
    
}

// custom color selector
custom_color_selector.onclick = (e)=>{
    if(e.target.tagName == 'LI'){
        [...custom_color_selector.children].forEach(e=>e.classList.remove('active'));
        e.target.classList.add('active');
        let styles = getComputedStyle(e.target);
        document.body.style.setProperty('--custom-hue',styles.getPropertyValue('--custom-hue'));
        document.body.style.setProperty('--custom-color',styles.getPropertyValue('--custom-color'));
        if(logo_url && umbrellas[e.target.dataset.idx].url){
            umbrella_container.classList.add('loading', 'logo-loading');
            upload_button.classList.add('loading')
            console.log(umbrella.url,umbrellas[e.target.dataset.idx].url)
            umbrella.src = umbrellas[e.target.dataset.idx].url;
            logo.src = logo_url;
        }
        else if(umbrellas[e.target.dataset.idx].url){
            umbrella_container.classList.add('loading');
            console.log(umbrella.url,umbrellas[e.target.dataset.idx].url)
            umbrella.src = umbrellas[e.target.dataset.idx].url;
        }
    }
}


// logo button 
function logo_change(){
    if(logo_input.files.length>0){
        upload_button.classList.add('has-logo');
        upload_button_text.innerText =  logo_input.files[0].name.length>20?logo_input.files[0].name.slice(0,20)+'...':logo_input.files[0].name;
        logo_url = URL.createObjectURL(logo_input.files[0]);
        umbrella_container.classList.add('has-logo','logo-loading');
        upload_button.classList.add('loading');
        logo.src = logo_url;
    }else{
        upload_button.classList.remove('has-logo');
        upload_button_text.innerText = 'UPLOAD LOGO';
        URL.revokeObjectURL(logo_url);
        logo.src = ""
        logo_url = "";
    }
}
logo_input.onchange = logo_change;
upload_close.onclick=()=>{
    umbrella_container.classList.add('logo-loading');
    upload_button.classList.add('loading')
    setTimeout(()=>{
        umbrella_container.classList.remove('has-logo');
        logo_input.value = null;
        logo_change();
        umbrella_container.classList.remove('logo-loading');
        upload_button.classList.remove('loading')
    
    },1000)
}
upload_icon.onclick = async ()=>{
    await logo_input.click();
}



