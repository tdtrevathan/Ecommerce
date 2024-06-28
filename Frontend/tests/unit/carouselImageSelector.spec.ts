import { CarouselImageSelector } from '@/services/carouselImageSeletor'

describe('CarouselImageSelector', () => {
  test('incriment from beginning, currentSlide is next slide', () => {
    const carouselImageSeletor = new CarouselImageSelector();

    const currentSlideIndex = 0;
    const totalSlides = 5;

    const result = carouselImageSeletor.incriment(currentSlideIndex, totalSlides)
    
    expect(result).toBe(1);
  }),
  test('incriment from end, currentSlide is first slide', () => {
    const carouselImageSeletor = new CarouselImageSelector();

    const currentSlideIndex = 4;
    const totalSlides = 5;

    const result = carouselImageSeletor.incriment(currentSlideIndex, totalSlides)
    
    expect(result).toBe(0);
  }),
  test('incriment from beginning, no slides exist, stays zero', () => {
    const carouselImageSeletor = new CarouselImageSelector();

    const currentSlideIndex = 0;
    const totalSlides = 0;

    const result = carouselImageSeletor.incriment(currentSlideIndex, totalSlides)
    
    expect(result).toBe(0);
  }),
  test('decriment from end, currentSlide is previous slide', () => {
    const carouselImageSeletor = new CarouselImageSelector();

    const currentSlideIndex = 4;
    const totalSlides = 5;

    const result = carouselImageSeletor.decriment(currentSlideIndex, totalSlides)
    
    expect(result).toBe(3);
  }),
  test('decriment from beginning, currentSlide is last slide', () => {
    const carouselImageSeletor = new CarouselImageSelector();

    const currentSlideIndex = 0;
    const totalSlides = 5;

    const lastSlideIndex = totalSlides - 1;

    const result = carouselImageSeletor.decriment(currentSlideIndex, totalSlides)
    
    expect(result).toBe(lastSlideIndex);
  }),
  test('decriment from beginning, no slides exist, stays zero', () => {
    const carouselImageSeletor = new CarouselImageSelector();

    const currentSlideIndex = 0;
    const totalSlides = 0;

    const result = carouselImageSeletor.incriment(currentSlideIndex, totalSlides)
    
    expect(result).toBe(0);
  })
})
