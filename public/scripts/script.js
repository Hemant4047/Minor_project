window.onload = function () {
    run();
};

function run() {
    // let ip = document.querySelector("#xray");
    // ip.addEventListener("input", function (e) {
    //     addImage(ip.files[0]);
    // });
    let drop_zone = document.querySelector("#drop_zone");
    let drop_zone__input = document.querySelector(".drop_zone__input");
    let form_element = document.querySelector(".dragForm");
    let btn1 = document.querySelector(".btn1");
    let btn2 = document.querySelector(".btn2");
    let radio1 = document.getElementById("radio1");
    let radio2 = document.getElementById("radio2");

    drop_zone.addEventListener("click", (e) => {
        drop_zone__input.click();
    });

    drop_zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        drop_zone.classList.add("border-red-600");
    });
    let leaveEvents = ["dragend", "dragleave"];
    leaveEvents.forEach((event) => {
        drop_zone.addEventListener(event, (e) => {
            if (drop_zone.classList.contains("border-red-600")) {
                drop_zone.classList.remove("border-red-600");
            }
        });
    });

    drop_zone.addEventListener("drop", (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
            drop_zone__input.files = e.dataTransfer.files;
            form_element.submit();
        }
    });

    drop_zone__input.addEventListener("change", (e) => {
        if (drop_zone__input.files.length) {
            form_element.submit();
        }
    });

    btn1.addEventListener("click", (e) => {
        if (btn1.classList.contains("bg-slate-300")) {
            btn1.classList.remove("bg-slate-300");
            btn1.classList.add("bg-yellow-300");
            radio1.checked = true;
            if (!btn2.classList.contains("bg-slate-300")) {
                btn2.classList.remove("bg-yellow-300");
                btn2.classList.add("bg-slate-300");
                radio2.checked = false;
            }
        } else {
            btn1.classList.remove("bg-yellow-300");
            btn1.classList.add("bg-slate-300");
            radio1.checked = false;
        }
    });
    btn2.addEventListener("click", (e) => {
        if (btn2.classList.contains("bg-slate-300")) {
            btn2.classList.remove("bg-slate-300");
            btn2.classList.add("bg-yellow-300");
            radio2.checked = true;
            if (!btn1.classList.contains("bg-slate-300")) {
                btn1.classList.remove("bg-yellow-300");
                btn1.classList.add("bg-slate-300");
                radio1.checked = false;
            }
        } else {
            btn2.classList.remove("bg-yellow-300");
            btn2.classList.add("bg-slate-300");
            radio2.checked = false;
        }
    });
}

// function addImage(file) {
//     //console.log(file);
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//         let imgHolder = document.getElementById("imageHolder");
//         imgHolder.classList.add("h-80");
//         imgHolder.classList.add("mb-2");
//         imgHolder.style.backgroundImage = `url('${reader.result}')`;
//     };
// }
