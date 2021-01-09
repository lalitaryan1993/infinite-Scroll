// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5; // For reduce the loading time first fetch the less images then this will increase the count
const apiKey = "oxYw0jwvjNwb4WNeFEjHqniW4OZqG5MviH9Tn4NTfPw";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// CHeck if all images were loaded
function imageLoaded() {
  // console.log("Image loaded");

  imagesLoaded++;
  // console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
    let count = 10;
    // console.log("ready = ", ready);
  }
}

// Helper Function to set attribute on DOM element
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // console.log("Total images", totalImages);
  // Run function for each object in photos array
  photosArray.forEach((photo) => {
    // Create <a></a> to link to unsplash API
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create img for photo
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.small,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);

    // Event Listener, Check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // Put img inside <a></a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    // console.log(photosArray);
    displayPhotos();
  } catch (error) {
    // Catch error here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    // console.log("Load more");
  }
});

// On Load
getPhotos();
