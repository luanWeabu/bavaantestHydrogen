export default async function StrapiClient(query: string, variable: string) {
  const URL = `https://theme.truestorefront.com/graphql`;

  const options = {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer a442fdfb749884b91a488ceac4ba6f0ba1d03f9e3c57170cc1e4fc428a683deab3a88cf430a0b8d9763c6647f2fb14fa90d340ba84a542205e68c6e1b0997219f2e48ccdc37c06d307d6f9af4671d998b01232ecebc4612b607036661ff9373b6558f8d4964f054444bc05c4c25212d1a037feab3f80e6f623231e5d91cd6884',
    },
    body: JSON.stringify({
      query,
      variable,
    }),
  };
  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json();
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Data failt is fetch`);
  }
}
