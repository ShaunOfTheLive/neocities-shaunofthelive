function pixivConvert(url) {
    const prefix = 'https://pixiv.kmn5.li/'
    const found = url.match(/(^|\/)(\d+)$/);

    if (found) {
        id = found[2];
    } else {
        return "Error: invalid format"; // early return
    }

    var convurl = prefix + id;
    return convurl;
}

function urlSubmit(event) {
    var inurl = document.getElementById('inurl').value;
    console.log(inurl);
    var convurl = pixivConvert(inurl);
    console.log(convurl);
    outurl.textContent = `${convurl}`;
    event.preventDefault();
}

const form = document.getElementById('form');
const outurl = document.getElementById('outurl');
form.addEventListener('submit', urlSubmit);
