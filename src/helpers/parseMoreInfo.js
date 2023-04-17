export default function parseMoreInfo(dom) {
  let response = {
    award: {
      wins: -1,
      nominations: -1,
    },
    images: [],
    productionStatus: null,
    releaseDetailed: {
      day: -1,
      month: -1,
      year: -1,
      releaseLocation: {
        country: null,
        cca2: null,
      },
      originLocations: [], // { country: null, cca2: null }
    },
    spokenLanguages: [], // { language: null, id: null }
    filmingLocations: [],
  }; // ensure type

  try {
    let nextData = JSON.parse(dom.getElementById("__NEXT_DATA__").innerHTML);
    let allData = nextData.props.pageProps.mainColumnData;

    try {
      response.award.nominations = allData.nominations.total;
      response.award.wins = allData.wins.total;
    } catch (_) {}

    try {
      response.images = allData.titleMainImages.edges
        .filter((e) => e.__typename === "ImageEdge")
        .map((e) => e.node.url);
    } catch (_) {}

    try {
      response.productionStatus =
        allData.productionStatus.currentProductionStage.text;
    } catch (_) {}

    try {
      response.releaseDetailed.day = allData.releaseDate.day;
      response.releaseDetailed.month = allData.releaseDate.month;
      response.releaseDetailed.year = allData.releaseDate.year;
      response.releaseDetailed.releaseLocation = {
        country: allData.releaseDate.country.text,
        cca2: allData.releaseDate.country.id,
      };
      response.releaseDetailed.originLocations =
        allData.countriesOfOrigin.countries.map((e) => ({
          country: e.text,
          cca2: e.id,
        }));
    } catch (_) {}

    try {
      response.spokenLanguages = allData.spokenLanguages.spokenLanguages.map(
        (e) => ({
          language: e.text,
          id: e.id,
        })
      );
    } catch (_) {}

    try {
      response.filmingLocations = allData.filmingLocations.edges.map(
        (e) => e.node.text
      );
    } catch (_) {}
  } catch (error) {
    console.log(`ParseMoreInfo error:`, error);
  }

  return response;
}
