$('.post-grid-carousel').slick({
    dots: true,
    infinite: true,
    slidesPerRow: 4,
    rows: 2,

    responsive: [
        {
            breakpoint: 576,
            settings: {
                slidesPerRow: 1,
                rows: 2
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesPerRow: 2,
                rows: 2
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesPerRow: 3,
                rows: 2
            }
        }
    ]
});