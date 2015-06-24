$(document).ready(function ($) {
    // delegate calls to data-toggle="lightbox"
    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
        console.log("ye to chal gaya");
        event.preventDefault();
        return $(this).ekkoLightbox();
    });
});

