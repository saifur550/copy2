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
          <div class="card" style="width:400px">
    <img class="card-img-top" src="img_avatar1.png" alt="Card image" style="width:100%">
    <div class="card-body">
      <h4 class="card-title">John Doe</h4>
      <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
      <a href="#" class="btn btn-primary">See Profile</a>
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

    <div class="card" style="width:400px">
    <img class="card-img-top" src="img_avatar1.png" alt="Card image" style="width:100%">
    <div class="card-body">
      <h4 class="card-title">John Doe</h4>
      <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
      <a href="#" class="btn btn-primary">See Profile</a>
    </div>
  </div>
    
    `
    singleDetails.appendChild(div);
    
}