import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {gallery} from '../main.js'

export const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
})


function articleTemplate(obj) {
    const {largeImageURL, webformatURL, tags, likes, views, comments, downloads} = obj;
return `<li class="photos-list-item">
  <a class="photos-list-link" href="${largeImageURL}">
  <img loading="lazy" class="photo" src="${webformatURL}" alt="${tags}"/>
  </a>
  <ul class="photo-information-container">
  <li class="item-photo-information-container"><p><span class="accent">Likes</span></br>${likes}</p></li>
  <li class="item-photo-information-container"><p><span class="accent">Views</span></br>${views}</p></li>
  <li class="item-photo-information-container"><p><span class="accent">Comments</span></br>${comments}</p></li>
  <li class="item-photo-information-container"><p><span class="accent">Downloads</span></br>${downloads}</p></li>
  </ul>
  </li>`
}

function articlesTemplate(arr) {
    // if (arr.length === 0) {
    //     iziToast.error({
    //   message: 'Sorry, there are no images matching your search query. Please try again!',
    //   theme: 'dark',
    //   progressBarColor: '#FFFFFF',
    //   color: '#EF4040',
    //   position: 'topRight',
    // });
    // }
return arr.map(articleTemplate).join("")  
}

export function renderArticle(arr) {
    const marcup = articlesTemplate(arr)
    gallery.insertAdjacentHTML("beforeend", marcup)
    lightbox.refresh();
}

