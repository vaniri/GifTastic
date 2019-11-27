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
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        for (let el of response.data) {
            let gifDiv = $("<div>");
            let gifImage = $("<img>");
            gifImage.attr("src", el.images.downsized.url);
            gifDiv.append(gifImage);
            $("#gif-container").prepend(gifDiv);
        }
    });
}

$('#clear-button').click(() => {
    $("#gif-container").empty();
})