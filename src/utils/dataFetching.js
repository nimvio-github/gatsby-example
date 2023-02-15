const { GraphQLClient } = require("graphql-request");

// support for .env, .env.development, and .env.production
require("dotenv").config();

const endpoint = `${process.env.CLIENT_APICD_URL}/${process.env.NIMVIO_PROJECT_ID}`;
const client = new GraphQLClient(endpoint, { headers: {} });

const globalCache = {}

const getContentById = async (id, option = {}) => {
  try {
    const query = /* GraphQL */ `
      query getContentById {
        content(contentId: "${id}") {
          Name
          ContentID
          Data
          TemplateName
          PublishedAt
        }
      }
    `;
    const response = await client.request(query);
    if (option && option.deep && response[0] && response[0].Data) {
      const referenceCache = option.cache || globalCache;
      referenceCache[id] = response[0]
      const responseData = response[0].Data;
      const responseDataKey = Object.keys(responseData);
      // Recursively fetch Reference Content
      for (const key of responseDataKey) {
        if (
          typeof responseData[key] === "object" &&
          responseData[key].Type === "Reference" &&
          responseData[key].ReferenceType === "Content" &&
          Array.isArray(responseData[key].ContentIDs)
        ) {
          responseData[key] = await Promise.all(
            responseData[key].ContentIDs.map(async (contentId) => {
              if (referenceCache[contentId]) {
                return referenceCache[contentId];
              } else {
                const { data } = await getContentById(contentId, {
                  deep: true,
                  cache: referenceCache,
                });
                referenceCache[contentId] = data
                return data;
              }
            })
          );
        }
      }
    }
    return { data: response[0] };
  } catch (error) {
    console.log("error fetching id ", id, error);
    console.log("error :", error);
  }
}

module.exports = {
  getContentById
}