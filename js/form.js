

function dateGenerator() {
    function addZeros(num) {
        return (String(num).length === 1 ? ("0" + num) : num)
    }
    function addTwoZeros(num) {
        return String(num).length === 1
            ? ("00" + num)
            : String(num).length === 2 ?
                ("0" + num)
                : num
    }
    const date = new Date()
    const months = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık",
    ]
    let str = addZeros(date.getMonth() + 1)
        + "/"
        + addZeros(date.getDate())
        + "/"
        + date.getFullYear()
        + " "
        + addZeros(date.getHours())
        + ":"
        + addZeros(date.getMinutes())
        + ":"
        + addZeros(date.getSeconds())
    return str;
}
$(document).on("keypress", 'form', function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        e.preventDefault();
        return false;
    }
});
const url = "https://script.google.com/macros/s/AKfycbxsbPM7h58-7A0SnEJfaH1T9RWNQZbKgt4EMFZRB8yyHSFNDUosbR7w6lEkut6Yku9bpg/exec"
const citiesOld = ["ESENYURT", "KÜÇÜKÇEKMECE", "BAĞCILAR", "PENDİK", "ÜMRANİYE", "BAHÇELİEVLER", "SULTANGAZİ", "ÜSKÜDAR", "MALTEPE", "GAZİOSMANPAŞA", "KADIKÖY", "KARTAL", "BAŞAKŞEHİR", "SANCAKTEPE", "ESENLER", "KAĞITHANE", "AVCILAR", "ATAŞEHİR", "EYÜPSULTAN", "FATİH", "BEYLİKDÜZÜ", "SULTANBEYLİ", "SARIYER", "ARNAVUTKÖY", "ZEYTİNBURNU", "GÜNGÖREN", "ÇEKMEKÖY", "TUZLA", "BAYRAMPAŞA", "ŞİŞLİ", "BÜYÜKÇEKMECE", "BEYKOZ", "BEYOĞLU", "BAKIRKÖY", "SİLİVRİ", "BEŞİKTAŞ", "ÇATALCA", "ŞİLE", "ADALAR"].sort();
const cities = ["Kağıthane", "Beşiktaş", "Şişli", "Beyoğlu", "Fatih", "Üsküdar", "Kadıköy"].sort();
const selectOfCitiesElement = document.getElementById("form-cities");

function getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'macos';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'ios';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'windows';
    } else if (/Android/.test(userAgent)) {
        os = 'android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'linux';
    }

    return os;
}

if (selectOfCitiesElement) {
    cities.forEach((c, i) => {
        const option = document.createElement("option");
        const trimmed = c.trim();
        option.value = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLocaleLowerCase("tr-TR");
        option.innerText = trimmed.charAt(0).toLocaleUpperCase("tr-TR") + trimmed.slice(1).toLocaleLowerCase("tr-TR");
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
    telephone: null,
    createdAt: dateGenerator(),
    visitedAt: dateGenerator(),
    platform: getOS() || "unknown"
}
function classToggler() {
    console.log("Working")
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

function submitFn() {
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
        classToggler()
        console.log("Worked");
        formData.createdAt = dateGenerator();
        formSubmitter.innerText = "Gönderiliyor..."
        console.log(formData)
        formSubmitFn().then(res => {
            if (res === false) {
                document.getElementById("error-modal-starter").click()
                classToggler()
                formSubmitter.innerText = "Bilgileri Gönder"
                return;
            }
            document.getElementById("modal-starter").click();
            formSubmitter.innerText = "Başarıyla Gönderildi ✔"
            formSubmitter.classList.add("success-submitter")
            //document.getElementById("success-overlay").style.display = "block"
        })
    }
}

formSubmitter.onclick = function (e) {
    submitFn();
    gtag_report_conversion('https://www.expercepte.com/');
}

const formSubmitFn = async () => {
    return fetch(url, {
        "headers": {
            "accept": " */*",
            "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7,no;q=0.6",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
        },
        "referrer": "https://www.apirequest.io/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": JSON.stringify(formData),
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
    }).then(res => {
        return res.text()
    }).then((res) => {
        return res;
    }).catch(e => {
        return false
    });
}

