getPreAOIData(
    timestampFrom: number,
    timestampTo: number,
    lines: any[],
    smtsns: any[]
  ) {
    let url =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[11] + "_search";
    const esQuery: any = {
      size: 10000,

    };
    // console.log("getPreAOIData url:", url);
    // console.log("getPreAOIData esQuery:", JSON.stringify(esQuery));
    return this.http.post(url, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }
getPreAOIData(
    timestampFrom: number,
    timestampTo: number,
    lines: any[],
    smtsns: any[]
  ) {
    let url =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[11] + "_search";
    const esQuery: any = {
      size: 10000,

    };
    // console.log("getPreAOIData url:", url);
    // console.log("getPreAOIData esQuery:", JSON.stringify(esQuery));
    return this.http.post(url, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }
getPreAOIData(
    timestampFrom: number,
    timestampTo: number,
    lines: any[],
    smtsns: any[]
  ) {
    let url =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[11] + "_search";
    const esQuery: any = {
      size: 10000,

    };
    // console.log("getPreAOIData url:", url);
    // console.log("getPreAOIData esQuery:", JSON.stringify(esQuery));
    return this.http.post(url, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }