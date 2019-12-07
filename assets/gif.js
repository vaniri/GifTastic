let existingAnimals = ["grumpy cat", "red panda", "fennec", "owl", "doge"];

existingAnimals.forEach(createButton);

$("#add-gif").click(() => {
    event.preventDefault();
    showMessage("");
    const animal = $('#gif-input').val().trim();
    if (animal === "") {
        showMessage("Please enter an animal!");
        return;
    }

    showAnimals(animal);
})

function createButton(animal) {
    const animalButton = $("<button>");
    animalButton.text(animal);
    $("#button-container").append(animalButton);
    animalButton.click(() => { showAnimals(animal); });
    existingAnimals.push(animal);
}

function showAnimals(animal) {
    let queryURL = `https://api.giphy.com/v1/gifs/search?q=${animal}&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        if (response.data.length === 0) {
            showMessage("There is no such animal!");
            return;
        }
        if (!existingAnimals.includes(animal)) {
            createButton(animal);
        }
        for (let el of response.data) {
            const gifDiv = $("<div>").addClass("animal-button");
            const gifImage = $("<img>").addClass("animal-image");;
            const rating = $("<p>").text("Rating: " + el.rating);
            gifImage.attr("src", el.images.downsized_still.url);
            gifDiv.append(gifImage);
            gifDiv.append(rating);
            $("#gif-container").prepend(gifDiv);
            let isStill = true;
            gifImage.click(() => {
                if (isStill) {
                    gifImage.attr("src", el.images.downsized.url);
                } else {
                    gifImage.attr("src", el.images.downsized_still.url);
                }
                isStill = !isStill;
            });
        }
    });
}

function showMessage(text) {
    $("#user-interaction").text(text);
}

$('#clear-button').click(() => {
    $("#gif-container").empty();
})