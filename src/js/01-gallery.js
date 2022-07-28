// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// импорт SimpleLightbox
import SimpleLightbox from "simplelightbox";
// импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

console.log(galleryItems);


const galleryRef = document.querySelector('.gallery')

function createGalleryMarkup(galleryItems) {
  
  const galleryMarkup = galleryItems.map(({preview,original,description}) => 
    `
      <a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
      </a>
    `
  ).join('')

  return galleryMarkup
}

galleryRef.insertAdjacentHTML('beforeend',createGalleryMarkup(galleryItems))


let gallery = new SimpleLightbox('.gallery a');
gallery.options.captionsData = 'alt';
gallery.options.captionDelay = 250;