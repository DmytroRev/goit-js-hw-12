import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = '43014445-2d3e2fe82a6f953d204684055';

export async function getUrl(query, page) {
    try {
        const res = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                per_page: 15,
                page,
            }
        })
        return res.data
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}

