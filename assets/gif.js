$("#add-gif").click(() => {
    event.preventDefault();
    let newGif = $('#gif-input').val().trim();
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newGif + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
            let gifDiv = $("<div>");
            console.log(222);
            let gifImage = $("<img>");
            console.log(333);
            gifImage.attr("src", response.data[i].images.downsized.url);//fixed_height
            console.log(gifImage);
            gifDiv.append(gifImage);
            $("#gif-container").prepend(gifDiv);
        }
    });
})

function clearDiv(() => {
    $("#gif-container").empty();
)
}