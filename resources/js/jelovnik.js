document.getElementById('shcart').style.display = "none";
$('div#shcart').fadeOut();


var receivedJSON = null;
var basket = [];

var mobileViewModeCartShow = false;

$(document).ready(function () {

    // add to basket
    $("div#popup #addToCart").click(function () {
        currentSelection.kolicina = document.querySelector('div#popup #popupQuantity').value;
        currentSelection.komentar = document.querySelector('div#popup #popupRemark').value;
        addToBasket();
    });

    // close order
    $("p#closeOrder").click(function () {
        $('div#shcart').fadeOut(800);
        $('.row').fadeIn();
        $('#header').fadeIn();
        $('div#delivery').fadeIn();
        $('html').removeClass('lb-disable-scrolling');
    });

    // view cart in mobile view
    $("p#cartMobileView").click(function () {
        if (mobileViewModeCartShow == false) {
            document.querySelector('div#shcart .Parent .Child:first-child').style.width = 0;
            document.querySelector('div#shcart .Parent .Child:nth-child(2)').style.width = 95 + '%';
            mobileViewModeCartShow = true;
        }
        else {
            document.querySelector('div#shcart .Parent .Child:nth-child(2)').style.width = 0;
            document.querySelector('div#shcart .Parent .Child:first-child').style.width = 100 + '%';
            mobileViewModeCartShow = false;
        }
       
    });
});

var mobileView = true;
setInterval(() => {
    if (document.documentElement.offsetWidth > 1050) {
        if (mobileView == false) return;
        mobileView = false;
        document.querySelector('div#shcart .Parent .Child:first-child').style.width = 55 + '%';
        document.querySelector('div#shcart .Parent .Child:nth-child(2)').style.width = 44 + '%';
        document.querySelector('p#cartMobileView').style.display = 'none';
    }
    else {
        if (mobileView == true) return;
        mobileView = true;
        document.querySelector('div#shcart .Parent .Child:first-child').style.width = 100 + '%';
        document.querySelector('div#shcart .Parent .Child:nth-child(2)').style.width = 0;
        document.querySelector('p#cartMobileView').style.display = 'table';
    }
}, 750);

function getOffersHTML(Arr) {
    var tempString = '';
    // console.log(Arr);
    Arr.forEach(function (v, i, a) {
        tempString += '<div id="dynOfferDiv" class="kategorija"><p>' + v.Naziv + '</p>';
        v.Ponuda.forEach(function (value) {
            tempString += getOfferHTML(value.JeloId, value.Naziv, value.Opis, value.Cijena);
        })
    });
    return tempString;
}
function getOfferHTML(id, naziv, opis, cijena) {
    return '<div class="row" onclick="popupAddToBasket(' + id + ', this)"><p class="cijena inKn">' + cijena.toFixed(2) + '</p><p class="naziv">' + naziv + '</p><p class="opis">' + opis + '</p></div>';
}


var currentSelection;
function popupAddToBasket(id, self) {
    var docSirina = document.documentElement.offsetWidth;
    var docVisina = document.documentElement.offsetHeight;
    var popupElement = document.querySelector('div#popup');
    var selfRect = self.getBoundingClientRect();

    // gore-dolje pozicijia popupa
    if (selfRect.top > docVisina * 0.5) {
        popupElement.style.bottom = docSirina <= 1050 ?
            (docVisina - selfRect.bottom) + 'px' :
            ((docVisina * 0.9) - selfRect.bottom) + 'px';
        popupElement.style.top = null;
        popupElement.className = 'arrowBottom';
    }
    else {
        popupElement.style.top = docSirina <= 1050 ?
            selfRect.top + 'px' :
            (selfRect.top - (docVisina / 10)) + 'px';
        popupElement.style.bottom = null;
        // popupElement.classList.remove('arrowTop');
        popupElement.className = 'arrowTop';
    }

    // lijevo-desno pozicija popup-a
    if (popupElement.offsetWidth * 2 >= docSirina * 0.9) {
        popupElement.style.left = docSirina - popupElement.offsetWidth + 'px';
    }
    else {
        popupElement.style.left = 51 + '%';
    }

    // 
    $('div#popup').fadeIn(800);
    receivedJSON.forEach(function (e, i, a) {
        e.Ponuda.find(function (element) {
            if (element.JeloId == id) {
                document.querySelector('div#popup div#popupTitle p#title').innerHTML = element.Naziv;
                document.querySelector('div#popup p.times.inKn').innerHTML = element.Cijena.toFixed(2);
                currentSelection = { id: element.JeloId, naziv: element.Naziv, cijena: element.Cijena };
            }
        })
    })
}

function deleteFromBasket(parent) {
    basket.find(function (e, i, a) {
        if (parent.childNodes[0].innerHTML == e.id
            && parent.childNodes[1].childNodes[0].nodeValue == e.naziv
            && parent.childNodes[2].innerHTML == e.kolicina
            && parent.childNodes[3].innerHTML == e.cijena.toFixed(2)) {
            basket.splice(i, 1)
            return true;
        }
    });

    writeToBasket()
    calculate();
}

// AddToBasketFunction
function addToBasket() {
    basket[basket.length] = currentSelection;
    writeToBasket();
    calculate();
    // cleanup
    currentSelection = null;
    document.querySelector('div#popup #popupQuantity').value = 1;
    document.querySelector('div#popup #popupRemark').value = "";
    document.querySelector('div#popup').style.display = "none";
}

function writeToBasket() {
    var tempString = "";
    basket.forEach(function (e, i, a) {
        tempString += getOrderTableRowHTML(e);
    });
    document.querySelector('div.cart tbody#basketContent').innerHTML = tempString;
}

function getOrderTableRowHTML(currSelection) {
    return '<tr><td>' + currSelection.id + '</td><td>' + currSelection.naziv + ((currSelection.komentar != null && currSelection.komentar != '') ? '<div class="komentar">+<span class="komentarText">' + currSelection.komentar + '</span></div>' : '')
        + '</td><td>' + currSelection.kolicina + '</td><td class="inKn">' + currSelection.cijena.toFixed(2) + '</td><td onclick="deleteFromBasket(this.parentNode);" class="delete">X</td></tr>';
}

function calculate() {
    var sum = 0;
    basket.forEach(function (v, i, a) {
        sum += (v.cijena * v.kolicina)
    })
    document.querySelector('div.cart td#basketPrice').innerHTML = sum.toFixed(2);
}