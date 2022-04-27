
const icon_spotify = document.querySelector('.spotify');    
const icon_book = document.querySelector('.book');    

icon_spotify.addEventListener('click', clickOnSpotify);                 
icon_book.addEventListener('click', clickOnBook);

function clickOnSpotify(event) {
  window.open("https://open.spotify.com/show/3HhiLTESfU61etNzoCQzVk",'width=600,height=500,left=0,top=0').creator;
  event.preventDefault();
}

function clickOnBook(event) {
  window.open("https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiOwof107L3AhXV9lEKHcY6BjsYABABGgJ3cw&ohost=www.google.it&cid=CAESa-D20Zpq26_cl28qM4SXf_cjwo4GZi6d7NEDuCvnLaZY6tYCFJ1ioHZiEkJCI5-dm61xCF_qFSwtVnlOSz9o7oS0BadGdlI1RMKJv1CSGbUA1AloxjY-7dspb9LbgiSwXL_NlLYNBDT3AhFi&sig=AOD64_358IWJYpZapLnAXypCqO_NRQCfDQ&q&adurl&ved=2ahUKEwiWmP3007L3AhWcSPEDHRP8CREQ0Qx6BAgCEAE",'width=600,height=500,left=0,top=0').creator;
  event.preventDefault();
}

//PRIMA API
const url="https://api.quotable.io/random"; 

const quotable_search = document.querySelector('#Search_1');
quotable_search.addEventListener('click',Generate_quotable);

function onResponse_quotable(response){
    return response.json();
}

function onJson_quotable(json){
  console.log(json);
  
  const text = json.content;
  const author = json.author;
  const box = document.querySelector('#container_1');
  box.innerHTML = ' ';
  const text_box = document.createElement('div');
  text_box.innerHTML = text;
  const author_box = document.createElement('p');
  author_box.innerHTML = author;
  box.appendChild(text_box);
  box.appendChild(author_box); 
}

function Generate_quotable(event){
  event.preventDefault();
  const restURL=url;
  //eseguo il fetch
  fetch(restURL).then(onResponse_quotable).then(onJson_quotable);
}

//SECONDA API 
const client_id = '6abaa1a35fcf404f9a1fafdb50ed4b29';
const client_secret = '86bdad9569b2428486f852fc736fd654';
let token;

const spotify_search = document.querySelector('.spotify_container');
spotify_search.addEventListener('submit', spotify_Search);

function onResponse_spotify(response) {
    //TEST console.log('OnResponse: ok');
    return response.json();
  }
  
function onJson_spotify(json) {
  //TEST console.log('OnJson: ok');
  // Svuotiamo la libreria
  const spotify_library = document.querySelector('#container_2');
  spotify_library.innerHTML = '';
  // ACQUISIAMO IL NUMERO DI RISULTATI TROVATI
  const results = json.albums.items;
  let num_results = results.length;
  // MOSTRARE MASSIMO 6 RISULTATI
  if(num_results > 6) num_results = 6;
  // PROCESSO I RISULTATI E CONCATENO I DATI AGLI APPOSITI ELEMENTI 
  for(let i=0; i<num_results; i++) {
    const element_list = results[i]
    const title = element_list.name;
    const selected_image = element_list.images[0].url;
    // CREIAMO IL div A CUI ANDREMO A CONCATENARE GLI ELEMENTI (immagine copertina e nome)
    const songs = document.createElement('div');
    songs.classList.add('box_spotify');
    const album_img = document.createElement('img');
    album_img.src = selected_image;
    const name = document.createElement('p');
    const link= document.createElement('a');
    link.setAttribute('href', element_list.external_urls.spotify);
    link.textContent = title;
    // AGGIUNGIAMO L'IMMAGINE DI COPERTINA, IL NOME, E IL LINK AL div
    songs.appendChild(album_img);
    songs.appendChild(name);
    songs.appendChild(link);
    //Aggiungiamo il div all'article
    spotify_library.appendChild(songs);
  }
} 

  
  //TEST console.log('Eseguo ricerca: ' + tracks_value);
  //TEST console.log(tracks.value);
  //TEST console.log(tracks_value);


  //TEST console.log(json)
  // IMPOSTA LA VARIABILE token A GLOBALE

function spotify_Search(event){
  event.preventDefault();
  const tracks = document.querySelector('#track');
  const tracks_value = encodeURIComponent(tracks.value);
//RICHIESTA - CONCATENAZIONE URL SPOTIFY CON IL VALORE
  fetch("https://api.spotify.com/v1/search?type=album&q=" + tracks_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse_spotify).then(onJson_spotify);
}
  
function onTokenJson_spotify(json){
  token = json.access_token;
}

function onTokenResponse_spotify(response){
  return response.json();
}

fetch("https://accounts.spotify.com/api/token",
  {
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
  {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
  }
}).then(onTokenResponse_spotify).then(onTokenJson_spotify);


