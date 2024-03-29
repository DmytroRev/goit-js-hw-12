import { getUrl } from "./js/pixabay-api";
import { renderArticle } from "./js/render-functions";

export const refs = {
    form: document.querySelector(".form"),
    gallery: document.querySelector(".gallery")
}

refs.form.addEventListener("submit", handleSubmit);

async function  handleSubmit(e) {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();
    const data = await getUrl(query, 1)
    renderArticle(data.hits)
    
}