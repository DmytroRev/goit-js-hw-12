import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// import { showLoader } from './js/render-functions';
import { getUrl } from "./js/pixabay-api";
import { renderArticle, lightbox } from "./js/render-functions";

export const refs = {
    form: document.querySelector(".form"),
    gallery: document.querySelector(".gallery"),
    btnLoadMore: document.querySelector(".btn-footer-form"),
    loader: document.querySelector(".loader")
}

function showLoader() {
    refs.loader.classList.remove("is-hidden")
}

export function hideLoader() {
    refs.loader.classList.add("is-hidden")
}

function showLoadMore() {
    refs.btnLoadMore.classList.remove("is-hidden")
}

function hideLoadMore() {
    refs.btnLoadMore.classList.add("is-hidden")
}



// refs.loader.style.display = 'none';

// export const showLoader = () => {
//     loader.style.display = 'flex';
    
// };
// const hideLoader = () => {
//     loader.style.display = 'none';
// };


let query;
let perPage = 1;
let maxPage = 0;
const perSize = 15;

refs.form.addEventListener("submit", handleSubmit);

async function  handleSubmit(e) {
    e.preventDefault();
    hideLoadMore();
    showLoader();
    query = e.target.elements.query.value.trim();
    refs.gallery.innerHTML = "";
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

    const data = await getUrl(query, perPage)

    maxPage = Math.ceil(data.totalHits / perSize)
    renderArticle(data.hits)
    checkLoadStatus();
    hideLoader();
    e.target.reset();
    
}

refs.btnLoadMore.addEventListener("click", handleLoadClick);

async function handleLoadClick() {
    showLoader()
    perPage += 1;
        const data = await getUrl(query, perPage)
    renderArticle(data.hits)
    // checkLoadStatus();
}





function checkLoadStatus() {
    if (perPage >= maxPage) {
        hideLoadMore()
    } else {
        showLoadMore()
    }
}