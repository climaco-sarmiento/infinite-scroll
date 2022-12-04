const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 30;
const apiKey = 'U-g_VtD7Ze3Lf8ZdytF_m39mhxCsaj5DbxA65kulpds';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
  imageLoaded++;
  if (imageLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// create elements for links and photos, add to DOM
function displayPhotos() {
  imageLoaded = 0;
  totalImages = photosArray.length;
  // run function for each object in photosArray
  photosArray.forEach((photo) => {
    // create <a> to link to Unsplash
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');
    // create <img> for photo
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);
    // event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error here
  }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});


// on load
getPhotos();