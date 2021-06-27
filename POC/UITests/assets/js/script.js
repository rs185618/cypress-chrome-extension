window.addEventListener('load', (event) => {
    const iframe = document.querySelector('iframe');
    //iframe.addEventListener('load', (event) => {
        console.log('inn')
        const doc = iframe.contentDocument || iframe.contentWindow;
        console.log(doc)
        doc.body.addEventListener("mouseenter", function (e) {
            //const doc = window.contentDocument || document.iframe;
            //    let divs = doc.querySelectorAll('div');
            // doc.addEventListener('mouseenter', e => {
            console.log('e.target')
            console.log(e.target)
            // })
            /*divs.forEach(div=>{
                div.addEventListener('mouseenter', e => {
                    console.log('in')
                    console.log(e.target.style.width);
                })
            })*/
        });
   // });
})

/*
let divs = doc.querySelectorAll('div');
console.log(divs)
divs.forEach(div=>{
    div.addEventListener('mouseenter', e => {
        console.log('in')
        console.log(e.target.style.width);
    })
})*/
