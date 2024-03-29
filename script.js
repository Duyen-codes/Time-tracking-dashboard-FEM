const buttons = document.querySelectorAll(".timeframe");
buttons[0].classList.add("active");
let clickedOption = "daily";
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("btn clicked");
    activateClickedButton(button);
    clickedOption = button.dataset.option;
    console.log("clickedOption", clickedOption);
    renderCards(clickedOption);
  });
});

const activateClickedButton = (button) => {
  buttons.forEach((b) => b.classList.remove("active"));
  button.classList.add("active");
};

const loadData = async () => {
  const response = await fetch("./data.json");
  const fetchedData = await response.json();
  return fetchedData;
};

loadData();
const clearActivities = () => {
  const activities = document.querySelectorAll(".activity-tracker_activity");
  activities.forEach((a) => a.remove());
};

const renderCards = async (option) => {
  const data = await loadData();
  clearActivities();
  const main = document.querySelector("main");
  const calcTimeframe = (option) => {
    if (option === "daily") {
      return "Yesterday";
    } else if (option === "weekly") {
      return "Last week";
    } else if (option === "monthly") {
      return "Last month";
    }
  };

  data.forEach((activity) => {
    const name = activity.title;
    const activityClass = name.toLowerCase().replace(" ", "-");
    const timeFrameData = activity.timeframes[option];
    const previousTimeframe = calcTimeframe(option);

    const section = document.createElement("section");
    section.classList.add("card", "activity-tracker_activity", activityClass);

    const stringToInject = `
             <div class="card-banner"><img class="card-banner-icon" src="./images/icon-${activityClass}.svg" alt=""></div>

            <div class="card-body">
                <div class="title-container">
                <h2 class="card-title">${name}</h2>
                <img src="./images/icon-ellipsis.svg">
                </div>

                <div class="current-prev">
                <h3 class="current">${timeFrameData.current}hrs</h3>
                <h4 class="previous">${timeFrameData.previous}hrs</h4>
                </div>

            </div>
        `;
    section.innerHTML = stringToInject;

    main.append(section);
  });
};

window.onload = renderCards(clickedOption);
