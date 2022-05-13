// const buttons = document.querySelectorAll('div')

// for (i = 0; i < buttons.length; i++) {
//     if (buttons[i]['className'] == 'card') {
//         buttons[i].addEventListener('click', (event) => {
//             console.log(event.target.innerHTML)
//         })
//     }
// }

// Retourner la carte
const cartes = document.getElementsByClassName('card')

for(i=0;i<cartes.length;i++){
    cartes[i].addEventListener('click', (e) =>{
        if(e.target.classList.contains('recto')){
            e.target.classList.add('verso')
            e.target.classList.remove('recto')
        }
        else{
            e.target.classList.remove('verso')
            e.target.classList.add('recto')
        }
    })
}

document.getElementById("btn-plus").addEventListener('click', (e) =>{
    document.getElementById("popupForm").style.display = "block";
})


document.getElementById("btn-register").addEventListener('click', (e) =>{
    document.getElementById("popupForm").style.display = "none";
})