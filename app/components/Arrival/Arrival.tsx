import React, {useState, useCallback, useEffect} from 'react';
import {NextButton, PrevButton} from '../EmblaCarouselArrow';
import useEmblaCarousel, {EmblaCarouselType} from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import 'remixicon/fonts/remixicon.css';

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

  const getDataArrivalData = dataArrivalData.map((item: any) => {
    const collectionIdString = item.id;

    const lastIndex = collectionIdString.lastIndexOf('/');

    const numericId = collectionIdString.slice(lastIndex + 1);

    const numericIdNumber = parseInt(numericId, 10);
    return numericIdNumber;
  });
  console.log(dataArrivalData);

  return (
    <div className="relative" key={getDataArrivalData}>
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
                          <div>
                            <img src={product.featuredImage.url} alt="" />
                          </div>
                          <div className="flex flex-col flex-1 gap-1">
                            <div className="flex items-center justify-between h-6 mt-1">
                              <div className="text-sm text-gray-600">
                                {product.vendor}
                              </div>
                              <div className="flex items-center gap-3">
                                <div>
                                  <i className="ri-arrow-left-right-line"></i>
                                </div>
                                <div>
                                  <i className="ri-heart-line"></i>
                                </div>
                              </div>
                            </div>
                            <div>
                              <p>{product.title}</p>
                            </div>
                            <div>
                              <p>
                                {product.priceRange.minVariantPrice.amount}{' '}
                                {
                                  product.priceRange.minVariantPrice
                                    .currencyCode
                                }
                              </p>
                            </div>
                          </div>
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

      <div className="embla__buttons_arrival  flex justify-between w-[95vw] ">
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
    return item.products;
  });

  const filterCollectionsTitleArrival = dataArriavalTitle.collections.data.map(
    (item: any) => {
      return item.attributes.title;
    },
  );

  const filterArrival = dataArrivalData.filter((item: any) => {
    return filterCollectionsTitleArrival.includes(item.title);
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
                        <span
                          className={`${
                            showProducts === item.attributes.title
                              ? 'underline'
                              : ''
                          }`}
                        >
                          {item.attributes.title}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              {filterArrival.map(
                (filterItem: any) =>
                  filterItem.title === showProducts &&
                  renderItems(filterArrival, filterItem.title),
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
