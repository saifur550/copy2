const deviceContainer = document.getElementById('deviceContainer');
const singleDetails = document.getElementById('singleDetails')
const loadBtn = document.getElementById('loadBtn');




// Button  add EventListener 
loadBtn.addEventListener('click', function(){
    const input = document.getElementById('input');
    
    const searchText = input.value;
    deviceContainer.textContent = '';
    singleDetails.innerHTML = '';

     if(searchText == 0){
        // alert('plz enter the device name')
        document.getElementById('alert').innerText = 'please Enter The Device Name!';
     }  

     else{
        const api =`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    
        // fetch the url 
    
         fetch(api)
        .then(res => res.json())
        .then(data => deviceDetails(data.data))
    
        // clear the search box value
        input.value ='';  
        document.getElementById('alert').innerText = '';
     }
     
    
})


// all device details display 
const deviceDetails=(details)=>{
  console.log(details.slice(0,20));

    if(details.length ==0){
      document.getElementById('alert').innerText = 'No Result Found!';
    }


    else{
      
    details.slice(0,20).forEach(detail => {
         console.log(details.length);
         document.getElementById('alert').innerText = ` Total Device Found : ${details.length}`;
  
         // create new div and added class name
          const div = document.createElement('div');
          div.classList.add('col-lg-4');
          div.innerHTML = `
          <div class="card text-center mb-4 card-bg">

          <img class="w-25 m-auto mt-4" src="${detail.image}" alt="Card image" >
          <div class="card-body">
            <h4 class="card-title">${detail.brand}</h4>
            <p class="card-text">${detail.phone_name}</p>
            <button onClick= "showSingleDevice('${detail.slug}')" class="btn btn-primary mb-3">Details</button>
          </div>
        </div>
          `
          // appendChild 
          deviceContainer.appendChild(div);
          
  
      })
    }


}


const showSingleDevice =(info)=>{
    // console.log(info);
    const apiId = `https://openapi.programming-hero.com/api/phone/${info}`;

    //fetch
    fetch(apiId)
    .then(res => res.json())
    .then(data => singleDeviceDetails(data.data))
}



// single device details show
const  singleDeviceDetails=(info)=>{
    // console.log(info);
    singleDetails.textContent ='';

    // create new div 
    const div = document.createElement('div');
    div.classList.add('col-lg-6', 'mx-auto',);
    
    div.innerHTML = `

    <div class="card card-bg mb-3" style="max-width: 600px;">
    <div class="row g-0">
      <div class="col-md-4 align-self-center">
        <img src="${info.image}" class="img-fluid p-1 rounded-start" alt="...">
      </div>
      <div class="col-lg-8">
        <div class="card-body">
          <h5 class="card-title fw-bold">${info.name}</h5>
          <p class="card-text"><small class="">${info.releaseDate}</small></p>
          <h5 class="text-success">Main Features</h5>
          <p class="m-0 fw-light"> -${info.mainFeatures.storage}</p>
          <p class="m-0 fw-light"> -${info.mainFeatures.displaySize}</p>
          <p class="m-0 fw-light"> -${info.mainFeatures.chipSet}</p>
          <p class="m-0 fw-light"> -${info.mainFeatures.memory}</p>
          <ol>${info.sensors.map(sensor=>{
            <li>` ${sensor}`</li>
          })}</ol>
        </div>
      </div>
    </div>
  </div>
    
    `
    singleDetails.appendChild(div);
    
}