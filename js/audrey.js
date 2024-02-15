function setupCarousel(carouselId, images, interval) {
    let currentIndex = 0;
    const carouselImage = document.querySelector(`#${carouselId} .carousel-image`);
    carouselImage.src = images[currentIndex];
    carouselImage.style.opacity = 1;

    setInterval(() => {
        carouselImage.style.opacity = 0;
        currentIndex = (currentIndex + 1) % images.length;
        setTimeout(() => {
            carouselImage.src = images[currentIndex];
            carouselImage.style.opacity = 1;
        }, 1000);
    }, interval);
}

document.addEventListener('DOMContentLoaded', function() {
    const images1 = ["assets/dog1.jpg", "assets/dog2.jpg" , "assets/dog7.jpg", "assets/dog10.jpg"]; // Add your images
    const images2 = ["assets/dog3.jpg", "assets/dog4.jpg", "assets/dog8.jpg", "assets/dog11.jpg"]; // Add your images
    const images3 = ["assets/dog5.jpg", "assets/dog6.jpg", "assets/dog9.jpg", "assets/dog12.jpg"]; // Add your images

    setupCarousel('carousel1', images1, 6000); // Interval 3000ms
    setupCarousel('carousel2', images2, 7000); // Interval 4000ms
    setupCarousel('carousel3', images3, 8000); // Interval 5000ms
});

