import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { showLoader } from './js/render-functions';
import { getUrl } from "./js/pixabay-api";
import { renderArticle, lightbox } from "./js/render-functions";

export const refs = {
    form: document.querySelector(".form"),
    gallery: document.querySelector(".gallery"),
    btnLoadMore: document.querySelector(".btn-footer-form"),
    loader: document.querySelector(".loader")
}

let query;
let perPage = 1;
let maxPage = 0;
const perSize = 15;

refs.form.addEventListener("submit", handleSubmit);

async function  handleSubmit(e) {
    e.preventDefault();
    query = e.target.elements.query.value.trim();
    refs.gallery.innerHTML = "";
    perPage = 1
    
    if (!query) {
        iziToast.error({
          message: 'Please complete the field!',
        theme: 'dark',
        progressBarColor: '#FFFFFF',
        color: '#EF4040',
            position: 'topRight',
        
        })
        return
    }

    const data = await getUrl(query, perPage)

    maxPage = Math.ceil(data.totalHits / perSize)
    renderArticle(data.hits)
    checkLoadStatus();
    e.target.reset();
}

refs.btnLoadMore.addEventListener("click", handleLoadClick);

async function handleLoadClick() {
    perPage += 1;
        const data = await getUrl(query, perPage)
    renderArticle(data.hits)
    // checkLoadStatus();
}



function showLoadMore() {
    refs.btnLoadMore.classList.remove("hidden")
}

function hideLoadMore() {
    refs.btnLoadMore.classList.add("hidden")
}

function checkLoadStatus() {
    if (perPage >= maxPage) {
        hideLoadMore()
    } else {
        showLoadMore()
    }
}