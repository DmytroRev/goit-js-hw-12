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
    gallery.innerHTML = "";
     perPage = 1
    query = e.target.elements.query.value.trim();
    
    if (!query) {
        iziToast.error({
          message: 'Please complete the field!',
        theme: 'dark',
        progressBarColor: '#FFFFFF',
        color: '#EF4040',
            position: 'topRight',
        
        })
        hideLoader()
        return
    }

    try {
        const data = await getUrl(query, perPage);
        // showLoader()
        maxPage = Math.ceil(data.totalHits / perSize);
        if (data.hits.length === 0) {
             iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        theme: 'dark',
        progressBarColor: '#FFFFFF',
        color: '#EF4040',
        position: 'topRight',
      });
        } else {
            renderArticle(data.hits);
            checkLoadStatus();
        }
    } catch (err) {
        console.log(err);
            iziToast.error({
      message: 'Sorry, an error occurred while loading. Please try again!',
      theme: 'dark',
      progressBarColor: '#FFFFFF',
      color: '#EF4040',
      position: 'topRight',
    });
    }
   
    hideLoader();
    e.target.reset();
    
}

btnLoadMore.addEventListener("click", handleLoadClick);

async function handleLoadClick() {
    perPage += 1;
    hideLoadMore()
    showLoader();

    try {
        const data = await getUrl(query, perPage)
    renderArticle(data.hits)
    } catch (err) {
        console.log(err);
            iziToast.error({
      message: 'Sorry, an error occurred while loading. Please try again!',
      theme: 'dark',
      progressBarColor: '#FFFFFF',
      color: '#EF4040',
      position: 'topRight',
    });
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