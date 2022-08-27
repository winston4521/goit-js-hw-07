import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');

const imagesMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('afterbegin', imagesMarkup);

galleryContainer.addEventListener('click', onImageClick);

// Create and map elements
function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item"
    <a class="gallery__link"
        href="${original}">
        <img class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}">
       </a>
</div>`;
    })
    .join('');
}

// Create delegation and biggest element

function onImageClick(e) {
  e.preventDefault();
  const isImageEl = e.target.classList.contains('gallery__image');

  if (!isImageEl) {
    return;
  }
  const originalImg = e.target.dataset.source;
  console.log(originalImg);

  const largeImage = `<img src="${originalImg}" width="800" height="600">`;
  const instance = basicLightbox.create(largeImage, {
    onShow: () => document.addEventListener('keydown', onModalClose),
    onClose: () => document.removeEventListener('keydown', onModalClose),
  });

  instance.show();

  // ===========modal close================
  addEventListener('keydown', onModalClose);

  function onModalClose(e) {
    if (e.code === 'Escape') {
      instance.close();
    }
  }
}
