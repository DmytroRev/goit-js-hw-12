import { refs } from "../main";

import (refs)
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
  return arr.map(articleTemplate).join("")
}

export function renderArticle(arr) {
    const marcup = articlesTemplate(arr)
    refs.gallery.insertAdjacentHTML("beforeend", marcup)
}
