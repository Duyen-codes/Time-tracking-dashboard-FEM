


const buttons = document.querySelectorAll('.timeframe');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        activateClickedButton(button)
        const clickedOption = button.dataset.option
        console.log(clickedOption)
        renderCards(clickedOption)
    })
});

let data = []

const activateClickedButton = button => {
    buttons.forEach(b =>
        b.classList.remove('active'))
    button.classList.add('active')
    console.log(button)
}

const loadData = async () => {
    const response = await fetch('./data.json')
    console.log(response);
    const fetchedData = await response.json()
    let data = fetchedData;
    console.log(data)
    buttons[1].click()
}

const clearActivities = () => {
    const activities = document.querySelectorAll('.activity-tracker_activity');
    activities.forEach(a => a.remove())
}

const renderCards = option => {
    clearActivities()
    const main = document.getElementsByClassName('main');
    const calcTimeframe = (option) => {
        if (option === 'daily') {
            return 'Yesterday'
        } else if (option === 'weekly') {
            return 'Last week'
        } else if (option === 'monthly') {
            return 'Last month'
        }
    }

    data.forEach(activity => {
        const name = activity.title
        const activityClass = name.loLowerCase().replace(' ', '-')
        const timeFrameData = activity.timeframes[clickedOption]
        const previousTimeframe = calcTimeframe(clickedOption)
        console.log(previousTimeframe)

        const section = document.createElement('section');
        section.classList.add('card', 'activity-tracker_activity', activityClass)

        const stringToInject = `
             <div class="card-banner"><img class="card-banner-icon" src="./images/icon-${activityClass}.svg" alt=""></div>

            <div class="card-body">
                <div class="title-container">
                <h2 class="card-title">${name}</h2>
                <img src="./images/icon-ellipsis.svg">
                </div>

                <div class="current-prev">
                <h3 class="current">${timeFrameData.current}hrs</h3>
                <span>-</span>
                <h4 class="previous">${timeFrameData.previous}hrs</h4>
                </div>

            </div>
        `
        section.innerHTML = stringToInject;
        console.log(section);
        main.append(section);
    });

}