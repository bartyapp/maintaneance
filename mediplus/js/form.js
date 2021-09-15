const cities = ["ESENYURT", "KÜÇÜKÇEKMECE", "BAĞCILAR", "PENDİK", "ÜMRANİYE", "BAHÇELİEVLER", "SULTANGAZİ", "ÜSKÜDAR", "MALTEPE", "GAZİOSMANPAŞA", "KADIKÖY", "KARTAL", "BAŞAKŞEHİR", "SANCAKTEPE", "ESENLER", "KAĞITHANE", "AVCILAR", "ATAŞEHİR", "EYÜPSULTAN", "FATİH", "BEYLİKDÜZÜ", "SULTANBEYLİ", "SARIYER", "ARNAVUTKÖY", "ZEYTİNBURNU", "GÜNGÖREN", "ÇEKMEKÖY", "TUZLA", "BAYRAMPAŞA", "ŞİŞLİ", "BÜYÜKÇEKMECE", "BEYKOZ", "BEYOĞLU", "BAKIRKÖY", "SİLİVRİ", "BEŞİKTAŞ", "ÇATALCA", "ŞİLE", "ADALAR"].sort();
const selectOfCitiesElement = document.getElementById("form-cities");

if (selectOfCitiesElement) {
    cities.forEach((c, i) => {
        const option = document.createElement("option");
        const trimmed = c.trim();
        option.value = trimmed.toLowerCase();
        option.innerText = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
        selectOfCitiesElement.appendChild(option)
    })
}
function onlyNumberKey(evt) {

    // Only ASCII charactar in that range allowed 
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}
const formSubmitter = document.getElementById("form-submit");
const formElements = [
    document.getElementById("form-name"),
    document.getElementById("form-surname"),
    document.getElementById("form-cities"),
    document.getElementById("form-telephone"),
]
const formData = {
    name: null,
    surname: null,
    city: null,
    telephone: null
}
function classToggler() {
    formSubmitter.disabled = !formSubmitter.disabled;
    if (formSubmitter.classList.contains("disabled-submitter")) {
        formSubmitter.classList.remove("disabled-submitter")
    } else {
        formSubmitter.classList.add("disabled-submitter")
    }
}
function isDisabled() {
    if (formSubmitter.disabled === true && formSubmitter.classList.contains("disabled-submitter")) {
        return true
    } else {
        return false;
    }
}
function onChange(e) {
    if (e.target.id === "form-name") {
        formData.name = e.target.value;
    } else if (e.target.id === "form-surname") {
        formData.surname = e.target.value;
    } else if (e.target.id === "form-cities") {
        formData.city = e.target.value;
    } else if (e.target.id === "form-telephone") {
        formData.telephone = e.target.value;
    }
    const boolArr = Object.keys(formData).map((e, i) => {
        if (formData[e] === null || formData[e].length < 3) {
            return false
        } else {
            if (i === 3 && formData[e].length < 10) {
                return false;
            }
            return true
        }
    })
    if (boolArr.indexOf(false) > -1) {
        console.log(boolArr.toString())
        if (!isDisabled()) {
            classToggler()
        }
    } else {
        console.log(boolArr.toString())
        if (isDisabled()) {
            classToggler()
        }
    }
    return true
}

formElements.forEach((e, i) => {
    if (i === 2) {
        e.onchange = onChange
    } else {
        e.onkeyup = onChange
    }
})
formSubmitter.onclick = function (e) {
    const boolArr = Object.keys(formData).map((e, i) => {
        if (formData[e] === null || formData[e].length < 3) {
            return false
        } else {
            if (i === 3 && formData[e].length < 10) {
                return false;
            }
            return true
        }
    })
    if (boolArr.indexOf(false) > -1) {
        console.log(boolArr.toString())
        if (!isDisabled()) {
            classToggler()
        }
    } else {
        asyncPostCall("https://script.google.com/macros/s/AKfycbwgfx44LQtyskNuv2sf9GJYmISNzWNJd1uw7GywWSTUd9dndPiME9NH3xSty6SjUFBr/exec", formData);
    }
}

const asyncPostCall = async (url, reqData) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqData)
        });
        const data = await response.json();
        // enter you logic when the fetch is successful
        console.log(data);
    } catch (error) {
        // enter your logic for when there is an error (ex. error toast)
        console.log(error)
    }
}