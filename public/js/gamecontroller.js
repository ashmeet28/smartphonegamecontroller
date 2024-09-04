function S(id) { return document.getElementById(id); }

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

S("FullscreenIcon").addEventListener("click", function (ev) {
    openFullscreen(document.documentElement)
})


var controllerButtons = [1, 2, 3, 4].map(function (x) {
    return {
        elem: S("ControllerB" + x.toString(10)),
        controllerIndex: x
    }
})
console.log(controllerButtons)


var controllerState = [
    Math.floor(Math.random() * 1000000).toString(10),
    "0", "0", "0", "0",
    "0", "0", "0", "0",
]

controllerButtons.forEach(btn => {
    btn.elem.addEventListener("touchstart", function (ev) {
        ev.preventDefault()
        btn.elem.classList.add("bg-slate-500")
        controllerState[btn.controllerIndex] = "1"
    })

    btn.elem.addEventListener("touchcancel", function (ev) {
        ev.preventDefault()
        btn.elem.classList.remove("bg-slate-500")
        controllerState[btn.controllerIndex] = "0"
    })

    btn.elem.addEventListener("touchend", function (ev) {
        ev.preventDefault()
        btn.elem.classList.remove("bg-slate-500")
        controllerState[btn.controllerIndex] = "0"
    })
});


// var dataStoreCounter = 0

// var dataStoreHostname = window.location.hostname.toString()

// function getDataStore() {
//     return new Promise(function (resolve, reject) {
//         fetch("http://" + dataStoreHostname + ":3000/datastoreget", {
//             method: "GET",
//         }).then((res) => {
//             if (res.status === 200) {
//                 dataStoreCounter = parseInt(res.headers.get("sdss-data-store-counter"), 10)
//                 res.text().then((v) => { resolve(JSON.parse(v)) })
//             } else {
//                 reject()
//             }
//         })
//     })
// }

// function setDataStore(data) {
//     return new Promise(function (resolve, reject) {
//         fetch("http://" + dataStoreHostname + ":3000/datastoreset", {
//             method: "POST",
//             headers: {
//                 "sdss-data-store-counter": ((dataStoreCounter + 1) % 1000000000).toString(10)
//             },
//             body: JSON.stringify(data)
//         }).then((res) => {
//             if (res.status == 200) {
//                 dataStoreCounter = dataStoreCounter + 1
//                 resolve()
//             } else {
//                 reject()
//             }
//         })
//     })
// }

// var counter = 0
// function pingDataStore() {
//     getDataStore().then((ds) => {
//         if (!ds.hasOwnProperty("next_id")) {
//             ds.next_id = 1
//         }
//         ds.next_id++
//         setDataStore(ds)
//             .then(() => counter++)
//             .catch(() => console.log(2))
//             .finally(() => { setTimeout(() => pingDataStore(), 5) })
//     }).catch(() => console.log(1))
// }

// pingDataStore()

// setInterval(() => {
//     S("MainStatus").innerText = counter;
//     counter = 0
// }, 1000)

setInterval(() => {
    console.log(controllerState.join('-'))
}, 1000)