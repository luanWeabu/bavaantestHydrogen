import React, {useCallback, useEffect, useState} from 'react';
import useEmblaCarousel, {EmblaCarouselType} from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {BannerItem} from '~/common/carouselType';
import {Image, Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {NextButton, PrevButton} from './EmblaCarouselArrow';

export const EmblaCarousel = ({dataHomeSlider}: any) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, [Autoplay()]);
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
  const dataImage = dataHomeSlider.map((item: any) => {
    return item.image.data.attributes.url;
  });

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
    <div className="embla" ref={emblaRef}>
      <div className="embla__container ">
        {dataHomeSlider.map((item: any) => {
          const dataImage = dataHomeSlider.map((item: any) => {
            return item.image.data.attributes.url;
          });
          const dataImg = ['https://theme.truestorefront.com' + dataImage];

          return (
            <div className="embla__slide relative" key={item.id}>
              <div className="absolute left-[10%] top-[30%] ">
                <p className="text-[1.25rem] font-bold">{item.caption}</p>
                <h4 className="text-[3.25rem] font-bold">
                  {item.title}
                  {item.Line2 && item.Line2}
                </h4>
                <p className="font-bold mt-4 space leading-[1.333] max-w-[63ch]">
                  {item.text}
                </p>

                {item.buttonText === 'Shop Now' ? (
                  <button className=" font-semibold px-8 py-3 text-white bg-red-600 mt-5 md:mt-6">
                    {item.buttonText}
                  </button>
                ) : (
                  <button className="font-semibold px-8 py-3 border-2 border-white text-white rounded-full mt-5 md:mt-6">
                    {item.buttonText}
                  </button>
                )}
              </div>
              {item.image && (
                <Image
                  data={item.image.data.attributes.url}
                  aspectRatio="11/4"
                  src={`https://theme.truestorefront.com${item.image.data.attributes.url}`}
                  sizes="(max-width: 32em) 100vw, 45vw"
                />
              )}
              <div className="embla__buttons flex justify-between w-[92vw]">
                <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
                <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
