import React, {useCallback, useEffect, useState} from 'react';
import useEmblaCarousel, {EmblaCarouselType} from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {Image} from '@shopify/hydrogen';
import {NextButton, PrevButton} from './EmblaCarouselArrow';
import {BannerItem} from '~/common/carouselType';

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
        {dataHomeSlider.map((item: BannerItem) => {
          return (
            <div className="embla__slide relative" key={item.id}>
              <div className="absolute left-[10%] top-[30%] ">
                <p className="text-[1.25rem] font-bold">{item.caption}</p>
                <h4 className="text-[3.25rem] font-bold">
                  {item.title}
                  {item.titleLine2 && item.titleLine2}
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
                  aspectRatio="11/4"
                  src={`https://theme.truestorefront.com${item?.image?.data?.attributes?.url}`}
                  sizes="(max-width: 32em) 100vw, 45vw"
                />
              )}
              <div className="embla__buttons flex justify-between w-[97vw]">
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
