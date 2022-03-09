const buttons = document.querySelectorAll('div')

for (i = 0; i < buttons.length; i++) {
    if (buttons[i]['className'] == 'card') {
        buttons[i].addEventListener('click', (event) => {
            console.log(event.target.innerHTML)
        })
    }
}