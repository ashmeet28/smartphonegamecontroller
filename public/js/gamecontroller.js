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


var controllerButtons = [1, 2, 3, 4, 5, 6, 7, 8].map(function (x) {
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

setTimeout(() => {
    (function () {
        var isPrevDone = true
        var reqCounter = 0

        var reqInter = setInterval(() => {
            if (!isPrevDone) {

                return
            }

            isPrevDone = false

            fetch("http://" + window.location.hostname.toString(10) + ":3000/sendpacket", {
                method: "GET",
                headers: {
                    "httptoudpserver-content": controllerState.join('-')
                },
            }).then((res) => {
                if (res.status === 200) {
                    isPrevDone = true
                    reqCounter++
                } else {
                    clearInterval(reqInter)
                }
            }).catch(() => {
                clearInterval(reqInter)
            })

        }, 1000 / 120)

        setInterval(() => {
            if (reqCounter >= 100) {
                if (S("PingStatus").classList.contains("bg-rose-800")) {
                    S("PingStatus").classList.remove("bg-rose-800")
                }
            } else {
                if (!S("PingStatus").classList.contains("bg-rose-800")) {
                    S("PingStatus").classList.add("bg-rose-800")
                }
            }
            console.log(reqCounter)
            reqCounter = 0
        }, 1000 / 2)
    })()
}, 3000)
