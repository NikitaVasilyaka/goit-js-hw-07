import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox__image');

galleryList.addEventListener('click', onGalleryItemClick);

const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);
galleryList.insertAdjacentHTML('beforeend', galleryItemsMarkup);

function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
          </a>
        </li>
      `;
    })
    .join('');
}

function onGalleryItemClick(event) {
  event.preventDefault();

  const galleryItemImage = event.target;
  if (!galleryItemImage.classList.contains('gallery__image')) {
    return;
  }

  lightbox.classList.add('is-open');
  lightboxImage.src = galleryItemImage.dataset.source;
  lightboxImage.alt = galleryItemImage.alt;
}

lightbox.addEventListener('click', onLightboxClick);

function onLightboxClick(event) {
  const lightboxOverlay = event.target;
  if (!lightboxOverlay.classList.contains('lightbox__content')) {
    return;
  }

  lightbox.classList.remove('is-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';
}
