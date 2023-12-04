import StrapiClient from '~/lib/strapi';

export async function getSliderProductTitle() {
  const homeData = await StrapiClient(
    `#graphql
    query{
      home(publicationState: LIVE) {
        data {
          id
          attributes{
            modules {
              ...on ComponentModulesCollectionTabs {
                id
              title
                scrollToLoad
                limitItems
                collections {
                  data {
                    id
                    attributes {
                      title
                      handle
                      shopifyID
                    }
                  }
                }
              }
            }
          } 
      }
    }
}

  `,
    {},
  );
  return homeData;
}
export async function getSliderProductContent() {
  const homeData = await StrapiClient(
    `#graphql
    query {
    home(publicationState: LIVE) {
    data {
      id
      attributes{
        modules {
            ...on ComponentModulesBannerSlider {
              id
              bannerItems {
                id
                image {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
                textPosition
                showButton
                buttonText
                buttonStyle
                caption
                textColor
                text
                title
                titleLine2
                link
              }
            }
        }
      }
    }
  }
}

  `,
    {},
  );
  return homeData;
}
