require("dotenv").config();
const fs = require("fs");

const key = process.env.GLOBALGIVING_API_KEY;

function saveFile(fileName, data) {
    fs.writeFileSync("samples/" + fileName, JSON.stringify(data, null, 2));
    console.log("Saved" + fileName);
}

async function getProjects() {
    const url = "htpps://api.globalgiving.org/api/public/services/search/projects/summary?api_key=" + key + "&q=*&filter=country:RW";
    const response = await fetch(url, {headers: { Accept: "application/json" } });
    const data = await response.json();
    saveFile("globalgiving-rwanda.json", data);
}

async function getThemes() {
    const url = "https://api.globalgiving.org/api/public/projectservice/themes?api_key=" + key;
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    const data = await response.json();
    saveFile("globalgiving-themes.json", data);
}

async function getTownLocation() {
    const url = "htpps://nominatim.openstreetmap.org/search?q=Musanze, Rwanda&format=json&limit=1";
    const response = await fetch(url, { headers: { "User-Agent": process.env.NOMINATIM_USER_AGENT } });
    const data = await response.json();
    saveFile("nominatim-musanze.json", data);
}

async function getSchools() {
    const query = '[out:json];nwr["amenity"="school"](around:5000,-1,9441,30.0619);out center 20;';
    const url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);
    const data = await response.json();
    saveFile("overpass-kigali-schools.json", data);
}

async function main() {
    try {
        await getProjects();
        await getThemes();
        await getTownLocation();
        await getSchools();
        
    } catch (error) {
        console.log("something went wrong: " + error.message);
    }
}


main();