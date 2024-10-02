import APIKEY from './secret.js';
import apicall from './apicall.js';

const IMGPATH = 'https://image.tmdb.org/t/p/w500';
var allLinks = document.querySelectorAll('#link')
allLinks.forEach(function (value) {
    value.addEventListener('click', callForApi)
});

(() => {

    var apiPath = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=1`

    var apiAnswer = apicall(apiPath);
    apiAnswer.then(val => {
        showData(val.results, "popular")
    })
})()

function callForApi(e) {
    e.preventDefault();

    var data = this.getAttribute('for');
    var apiPath = '';
    var type = '';

    type = (data == 'home') ? "popular" : ((data == 'upcoming') ? "upcoming" : "top_rated");

    apiPath = `https://api.themoviedb.org/3/movie/${type}?api_key=${APIKEY}&language=en-US&page=1`

    var apiAnswer = apicall(apiPath);
    apiAnswer.then(val => {
        showData(val.results, data)
    })
}

function showData(record, data) {
    document.querySelector('#heading_page').innerHTML = data.toUpperCase();


    document.querySelector('#movieDiv').innerHTML = '';
    record.forEach(val => {
        var { id, poster_path, original_title } = val;

        var divTag = document.createElement('div');
        divTag.className = 'col-xl-3 col-6 text-center p-2 rounded';

        var imgTag = document.createElement('img');
        var ptag = document.createElement('p');
        ptag.className = 'text-light'

        imgTag.src = IMGPATH + poster_path;
        imgTag.className = 'img-fluid';
        ptag.innerText = original_title;

        divTag.append(imgTag, ptag)

        document.querySelector('#movieDiv').appendChild(divTag);
    })
}

document.querySelector('#formData').onsubmit = function (ev) {
    ev.preventDefault();
    var txtData = document.querySelector('#txt').value;
    if (txtData != '') {
        var apiPath = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${txtData}&page=1`
        var apiAnswer = apicall(apiPath);
        apiAnswer.then(val => {
            showData(val.results, 'Search By Movie :' + txtData)
        })
    }

}