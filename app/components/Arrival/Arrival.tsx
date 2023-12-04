import React, {useState, useCallback, useEffect} from 'react';
import {NextButton, PrevButton} from '../EmblaCarouselArrow';
import useEmblaCarousel, {EmblaCarouselType} from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ArrivalStyle from './styles.module.css';

interface Item {
  id: number;
  title: string;
  // Các thuộc tính khác của item
}

// Hàm helper để render mục theo điều kiện
const renderItems = (dataArrivalData: any, title: string): JSX.Element => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {slidesToScroll: 'auto', containScroll: 'trimSnaps'},
    [Autoplay()],
  );
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {dataArrivalData.map((item: any) => {
        if (item.title === title) {
          return (
            <div key={item.id}>
              <div className="min-w-full md:min-w-1/3 lg:min-w-1/4 pl-6 relative flex-auto">
                <div className="embla_arrival">
                  <div className="embla__viewport_arrival" ref={emblaRef}>
                    <div className="embla__container_arrival">
                      {item.products.nodes.map((product: any) => (
                        <div className="embla__slide_arrival" key={product.id}>
                          <img src={product.featuredImage.url} alt="" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}

      <div className="embla__buttons flex justify-between w-[95vw] ">
        <PrevButton
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          className="text-black embla__button_arrival "
        />
        <NextButton
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          className="text-black embla__button_arrival"
        />
      </div>
    </div>
  );
};

export const Arrival = ({getArrivalTitle, getArrivalData}: any) => {
  const [showProducts, setShowProducts] = useState('Men');

  const dataArriavalTitle =
    getArrivalTitle.data.home.data.attributes.modules[2];

  const dataArrivalData = getArrivalData.nodes.filter((item: any) => {
    if (
      item.title === 'Men' ||
      item.title === 'Women' ||
      item.title === 'Accessories'
    ) {
      return item.products;
    }
  });

  return (
    <section>
      <div className="mt-8">
        {dataArriavalTitle && (
          <div>
            <div className="flex items-center justify-center flex-col ">
              <div>
                <h4 className="whitespace-pre-wrap text-xl md:text-2xl font-bold uppercase">
                  {dataArriavalTitle.title}
                </h4>
              </div>
              <div className="flex mt-3 mb-8 gap-x-8 justify-center flex-row-reverse">
                {dataArriavalTitle.collections.data.map((item: any) => {
                  return (
                    <div key={item.id}>
                      <button
                        className="flex"
                        onClick={() =>
                          setShowProducts(`${item.attributes.title}`)
                        }
                      >
                        <span>{item.attributes.title}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              {showProducts === 'Men' && renderItems(dataArrivalData, 'Men')}
              {showProducts === 'Women' &&
                renderItems(dataArrivalData, 'Women')}
              {showProducts === 'Accessories' &&
                renderItems(dataArrivalData, 'Accessories')}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
