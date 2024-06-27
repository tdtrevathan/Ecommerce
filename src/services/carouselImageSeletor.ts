
export class CarouselImageSelector {
    incriment = (currentSlide: number, totalSlides: number) => {
        const newVal = currentSlide += 1;
    
        return newVal >= totalSlides ? currentSlide = 0 : newVal
    } 
    decriment = (currentSlide: number, totalSlides: number) => {
        const newVal = currentSlide -= 1;
    
        return newVal < 0 ? totalSlides - 1 : newVal
    }
}