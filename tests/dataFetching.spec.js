const { getContentById } = require("../src/utils/dataFetching")


describe("getContentById", () => {
  const graphqlRequestMock = jest.fn()
  const client = {
    request: graphqlRequestMock
  }

  afterEach(() => {
    jest.clearAllMocks();
  })

  it ("should call request once if it is not deep", async () => {
    const responseData = {
      ContentID: "Content_81b8facc-0e81-45fe-a9a9-2c2be581dbd9",
      Data: {
        title: "Something"
      }
    }
    graphqlRequestMock.mockResolvedValue([responseData])
    const { data } = await getContentById(client, "Content_81b8facc-0e81-45fe-a9a9-2c2be581dbd9")
    expect(graphqlRequestMock).toBeCalledTimes(1)
    expect(data).toEqual(responseData)
  })

  it("should call request once because no reference in responseData", async () => {
    const responseData = {
      ContentID: "Content_81b8facc-0e81-45fe-a9a9-2c2be581dbd9",
      Data: {
        title: "Something"
      }
    }
    graphqlRequestMock.mockResolvedValue([responseData])
    const { data } = await getContentById(client, "Content_81b8facc-0e81-45fe-a9a9-2c2be581dbd9", { deep: true })
    expect(graphqlRequestMock).toBeCalledTimes(1)
    expect(data).toEqual(responseData)
  })

  it("should call request twice because of reference in responseData", async () => {
    const responseData = {
      ContentID: "Content_81b8facc-0e81-45fe-a9a9-2c2be581dbd9",
      Data: {
        title: "Something",
        contents: {
          Type: "Reference",
          ContentIDs: ["Content_30c29898-24c0-4f21-ae75-590d3040d629"],
          ReferenceType: "Content"
        }
      }
    }
    graphqlRequestMock.mockResolvedValue([responseData])
    const { data } = await getContentById(client, "Content_81b8facc-0e81-45fe-a9a9-2c2be581dbd9", { deep: true })
    expect(graphqlRequestMock).toBeCalledTimes(2)
    expect(data).toEqual(responseData)
  })

  it("should call request once because the data is cached", async () => {
    const cachedData = {
      "Content_30c29898-24c0-4f21-ae75-590d3040d629": {
        ContentID: "Content_30c29898-24c0-4f21-ae75-590d3040d629",
        Data: {
          title: "Something Inside"
        }
      }
    }
    const responseData = {
      ContentID: "Content_81b8facc-0e81-45fe-a9a9-2c2be581dbd9",
      Data: {
        title: "Something",
        contents: {
          Type: "Reference",
          ContentIDs: ["Content_30c29898-24c0-4f21-ae75-590d3040d629"],
          ReferenceType: "Content"
        }
      }
    }
    graphqlRequestMock.mockResolvedValue([responseData])
    const { data } = await getContentById(client, "Content_81b8facc-0e81-45fe-a9a9-2c2be581dbd9", { deep: true, cache: cachedData })
    expect(graphqlRequestMock).toBeCalledTimes(1)
    expect(data).toEqual(responseData)
  })
})