import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// import { showLoader } from './js/render-functions';
import { getUrl } from "./js/pixabay-api";
import { renderArticle, lightbox } from "./js/render-functions";


const form = document.querySelector(".form");
export const gallery = document.querySelector(".gallery");
const btnLoadMore = document.querySelector(".btn-footer-form");
const loader = document.querySelector(".loader");


function showLoader() {
    loader.classList.remove("is-hidden")
}

export function hideLoader() {
    loader.classList.add("is-hidden")
}

function showLoadMore() {
    btnLoadMore.classList.remove("is-hidden")
}

function hideLoadMore() {
    btnLoadMore.classList.add("is-hidden")
}


let query;
let perPage = 1;
let maxPage = 0;
const perSize = 15;

form.addEventListener("submit", handleSubmit);

async function  handleSubmit(e) {
    e.preventDefault();
    hideLoadMore();
    showLoader();
    query = e.target.elements.query.value.trim();
    gallery.innerHTML = "";
    perPage = 1
    
    if (!query) {
        hideLoader()
        iziToast.error({
          message: 'Please complete the field!',
        theme: 'dark',
        progressBarColor: '#FFFFFF',
        color: '#EF4040',
            position: 'topRight',
        
        })
        return
    }

    try {
        showLoader()
        const data = await getUrl(query, perPage);
        maxPage = Math.ceil(data.totalHits / perSize);
        renderArticle(data.hits);
    } catch (err) {
        console.log(err);
    }
   
    checkLoadStatus();
    hideLoader();
    e.target.reset();
    
}

btnLoadMore.addEventListener("click", handleLoadClick);

async function handleLoadClick() {
    perPage += 1;
    showLoader();
    try {
        const data = await getUrl(query, perPage)
    renderArticle(data.hits)
    } catch (err) {
        console.log(err);
    }
    myScroll();
    checkLoadStatus();
    hideLoader();
}

function checkLoadStatus() {
    if (perPage >= maxPage) {
        hideLoadMore()
        iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
      theme: 'dark',
      progressBarColor: '#FFFFFF',
      color: '#EF4040',
      position: 'topRight',
    });
    } else {
        showLoadMore()
    }
}

function myScroll() {
    const height = gallery.firstChild.getBoundingClientRect().height
    scrollBy({
        top: height * 3,
        behavior: 'smooth',
    })
}