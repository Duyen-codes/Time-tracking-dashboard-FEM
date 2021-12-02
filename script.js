
const buttons = document.querySelectorAll('.timeframe');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        activateClickedButton(button)
        const clickedOption = button.dataset.option
        renderCards(clickedOption)
    })
});

let data = []

const activateClickedButton = button => {
    buttons.forEach(b => b.classList.remove('active'))
    button.classList.add('active')
}

const loadData = async () => {
    const response = await fetch('data.json')
    const fetchedData = await response.json()
    data = fetchedData
    buttons[1].click()
}

const renderCards = option => {
    if (option === 'daily') {
        return 'Yesterday'
    }
}