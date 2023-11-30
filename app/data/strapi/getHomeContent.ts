import StrapiClient from '~/lib/strapi';

export default async function getHomeClient() {
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
