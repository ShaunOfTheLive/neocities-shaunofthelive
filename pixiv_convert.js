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
    var outelement;
    if (convurl.startsWith('Error')) {
        outelement = document.createElement("b");
        const textnode = document.createTextNode(convurl);
        outelement.appendChild(textnode);
    } else {
        outelement = document.createElement("a");
        const textnode = document.createTextNode(convurl);
        outelement.appendChild(textnode);
        outelement.href = convurl;
    }
    if (outp.firstChild) {
        outp.replaceChild(outelement, outp.firstChild);
    } else {
        outp.appendChild(outelement);
    }
    event.preventDefault();
}

const form = document.getElementById('form');
const outp = document.getElementById('outp');
form.addEventListener('submit', urlSubmit);
