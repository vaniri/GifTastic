let existingAnimals = [];

$("#add-gif").click(() => {
    event.preventDefault();
    let animal = $('#gif-input').val().trim();
    showAnimals(animal);

    if (!existingAnimals.includes(animal)) {
        let animalButton = $("<button>");
        animalButton.text(animal);
        $("#button-container").append(animalButton);
        animalButton.click(() => { showAnimals(animal); });
        existingAnimals.push(animal);
    }
})

function showAnimals(animal) {
    let queryURL = `https://api.giphy.com/v1/gifs/search?q=${animal}&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10`;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        for (let el of response.data) {
            let gifDiv = $("<div>").addClass("animal-button");
            let gifImage = $("<img>");
            let rating = $("<p>").text("Rating: " + el.rating);
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

$('#clear-button').click(() => {
    $("#gif-container").empty();
})