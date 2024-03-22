const loadPhone = async (searchText,isshowall) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones,isshowall)
}
const displayPhones = (phones,isshowall) =>{
  const PhoneContainer =document.getElementById('Phone-continer');
  //clear phone container before the search---//
  PhoneContainer.textContent = '';
//----display show all button if there are more than 12 phones/
const ShowAllbutton = document.getElementById('show-all-container');
if(phones.length > 12 && !isshowall){
  ShowAllbutton.classList.remove('hidden')
}else{
  ShowAllbutton.classList.add('hidden')
}

  //---display only first 12 phone if not show all----//
  if(!isshowall){
    phones = phones.slice(0,12);
  }
  

  phones.forEach(phone =>{
   
    //2---------- create a div--------//
    const pHonecard = document.createElement('div')
    pHonecard.classList= `card card-compact p-4 bg-gray-100 shadow-xl`

    //3 set inner html------//
    pHonecard.innerHTML = ` <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick="Handelshow_Details('${phone.slug}')"class="btn btn-primary">Show Details</button>
      </div>
    </div>`;
    //4----append child -----//
    PhoneContainer.appendChild(pHonecard)

  });
  //hide loading spiner
  loadingSpiners(false)

}
//---handel search button added----//
const handleSearch = (isshowall) =>{
  loadingSpiners(true);
  const Searchfield = document.getElementById('search-field')
  const searchText = Searchfield.value;
 
  loadPhone(searchText,isshowall);

}
//---Another search button added----//
// const HandelSearch2 = () => {
//   loadingSpiners(true);
//   const searchfield2 = document.getElementById('search-2');
//   const searchText2 = searchfield2.value;
//   loadPhone(searchText2)
// }
const loadingSpiners = (isloading) =>{
  const loading = document.getElementById('spiner-loading')
  if(isloading){
    loading.classList.remove('hidden')
  }else{
    loading.classList.add('hidden')
  }
}
//handel show all--//
const HandelShowAlltime = () =>{
  handleSearch(true);
}

const Handelshow_Details = async (id) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id};`);
  const data = await res.json();
  const phone = data.data
  showPhoneDetails(phone)
}
const showPhoneDetails = (phone) =>{
  console.log(phone)
  const phonName =document.getElementById('show-details-phone-name');
  phonName.innerText = phone.name;
  const showDetailContainer = document.getElementById('show_detail-container');
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt="" />
  <p><span>Storage:</span>${phone.mainFeatures}</P>
  `
  show_details_modal.showModal()
}
