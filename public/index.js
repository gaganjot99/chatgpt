const ele = document.getElementsByTagName("p")[0];

const inp = document.getElementsByTagName("input")[0];

const btn = document.getElementById("subb");

function getinfo(e){
    fetch("/askgpt",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({question: inp.value})
    }).then(json=>json.json())
    .then((response)=>{
        ele.innerText = response.answer;
    })
    .catch((e)=>console.log(e));

}

btn.addEventListener('click', getinfo);
