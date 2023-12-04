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
