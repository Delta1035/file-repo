import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TimeConverter } from "./utils/time-converter";
import { Constants } from "./utils/constants";
import { MockSchemaRegistry } from "@angular/compiler/testing";
// declare const require: any; // <-- 新增
import { ConfigDriver } from "@app/shared/service/utils/config.driver";

@Injectable()
export class EsPrDailyService {
  constructor(private http: HttpClient, private timeConverter: TimeConverter) {}

  /**
   * 查找postAOI的SPI、Pre、Post数据集
   * @param timestampFrom
   * @param timestampTo
   * @param lines
   * @param models
   * @param locations
   * @param smtsns
   * @returns
   */
  getPostAOISpiInfos(
    timestampFrom: number,
    timestampTo: number,
    lines: any[],
    models: any[],
    locations: any[],
    smtsns: any[]
  ) {
    let url = ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[9] + "_search";
    const esQuery = {
      timestampFrom,
      timestampTo,
      lines,
      models,
      locations,
      smtsns,
    };
    return this.http.post(url, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  /**
   * 新index的AOI资料获取
   * @param timeFromStamp
   * @param timeToStamp
   * @param lines
   * @param models
   * @param faces
   * @param mos
   * @param upns
   * @returns
   */
  getPreNgAOIData(
    timeFromStamp: number,
    timeToStamp: number,
    lines: any,
    models: any,
    faces?: any,
    mos?: any,
    upns?: any
  ) {
    let url = ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[7] + "_search";
    let esQuery: any = {
      timeFromStamp,
      timeToStamp,
      lines,
      models,
      faces,
      mos,
      upns,
    };

    // console.log("getPreNgAOIData ES URL: ", url);
    // console.log("getPreNgAOIData ES: ", JSON.stringify(esQuery));
    return this.http.post(url, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getNgSubusnByUsn(usn: string) {
    let url = ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[7] + "_search";
    let esQuery: any = { usn };
    // console.log("getNgSubusnByUsn ES URL: ", url);
    // console.log("getNgSubusnByUsn ES: ", JSON.stringify(esQuery));
    return this.http.post(url, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getPrOrDailyPercent(
    timestampFrom: number,
    timestampTo: number,
    tb: string,
    mfgtype: string[],
    lines: string[],
    models: string[],
    mos: string[],
    pns: string[]
  ) {
    // let urlString = 'http://emnrdb03.wks.wistron.com.cn:9200/pcba_badanalysis_wks_20*/badanalysis/_search';
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[0] + "_search";
    let esQuery: any = getParams(arguments,getArgs(this.getPrOrDailyPercent))
    // console.log("getCircle ES URL: ", urlString);
    // console.log("getCircle ES: ", JSON.stringify(esQuery));
    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getPrOrDailyDetail(
    timestampFrom: number,
    timestampTo: number,
    tb: string,
    mfgtype: string[],
    lines: string[],
    models: string[],
    mos: string[],
    pns: string[]
  ) {
    // console.log(mfgtype);
    let that = this;
    let stages = [];
    // let urlString = 'http://emnrdb03.wks.wistron.com.cn:9200/pcba_badanalysis_wks_20*/badanalysis/_search';
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[0] + "_search";
    // let urlString = config.esUrl + config.indexs[0] + '_search';
    let esQuery: any = {
      timestampFrom,
      timestampTo,
      tb,
      mfgtype,
      lines,
      models,
      mos,
      pns,
    };

    // console.log("table pcba_badanalysis ES URL: ", urlString);
    // console.log("table pcba_badanalysis ES: ", JSON.stringify(esQuery));
    return this.http
      .post(urlString, esQuery, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        ),
      })
      .toPromise();
  }

  getPrOrDailyDetailByF236(
    timestampFrom: number,
    timestampTo: number,
    tb: string,
    mfgtype: string[],
    lines: string[],
    models: string[],
    mos: string[],
    pns: string[]
  ) {
    // console.log(mfgtype);
    let that = this;
    let stages = [];
    // let urlString = 'http://emnrdb03.wks.wistron.com.cn:9200/pcba_badanalysis_wks_20*/badanalysis/_search';
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[12] + "_search";
    // let urlString = config.esUrl + config.indexs[0] + '_search';
    let esQuery: any = {
      timestampFrom,
      timestampTo,
      tb,
      mfgtype,
      lines,
      models,
      mos,
      pns,
    };

    return this.http
      .post(urlString, esQuery, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        ),
      })
      .toPromise();
  }

  getAllLinesAndModelsAndMosAndPns(timestampFrom?, timestampTo?, mfgtype?) {
    let that = this;
    // let urlString = 'http://emnrdb03.wks.wistron.com.cn:9200/pcba_badanalysis_wks_20*/badanalysis/_search';
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[0] + "_search";
    let esQuery: any = { timestampFrom, timestampTo, mfgtype };
    if (!!mfgtype) {
      esQuery.query.bool.must.push({
        term: {
          "mfgtype.raw": mfgtype,
        },
      });
    }

    if (!!timestampFrom && !!timestampTo) {
      esQuery.query.bool.must.push({
        range: {
          evt_dt: {
            from: timestampFrom,
            to: timestampTo,
            include_lower: true,
            include_upper: true,
          },
        },
      });
    }
    // console.log(" getAllLinesAndModelsAndMosAndPns url is", urlString);
    // console.log(" getAllLinesAndModelsAndMosAndPns esQuery is", JSON.stringify(esQuery));
    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getLineModelMObyTimeandStage(
    timestampFrom,
    timestampTo,
    stage,
    lines,
    models,
    field
  ) {
    let that = this;
    // let urlString = 'http://emnrdb03.wks.wistron.com.cn:9200/pcba_badanalysis_wks_20*/badanalysis/_search';
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[0] + "_search";
    let esQuery: any = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              term: {
                "site.raw": "WKS",
              },
            },
            {
              term: {
                "plant.raw": "F232",
              },
            },
            {
              terms: {
                "stage.raw": stage,
              },
            },
            {
              range: {
                evt_dt: {
                  from: timestampFrom,
                  to: timestampTo,
                  include_lower: true,
                  include_upper: true,
                },
              },
            },
          ],
        },
      },
    };

    if (lines.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "line.raw": lines,
        },
      });
    }

    if (models.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "model.raw": models,
        },
      });
    }

    if (field.includes("line")) {
      esQuery["aggs"] = {
        line: {
          terms: {
            field: "line.raw",
            size: 10000,
          },
        },
      };
    } else if (field.includes("model")) {
      esQuery["aggs"] = {
        model: {
          terms: {
            field: "model.raw",
            size: 10000,
          },
        },
      };
    } else if (field.includes("upn")) {
      esQuery["aggs"] = {
        upn: {
          terms: {
            field: "upn.raw",
            size: 10000,
          },
        },
      };
    } else if (field.includes("mo")) {
      esQuery["aggs"] = {
        mo: {
          terms: {
            field: "mo.raw",
            size: 10000,
          },
        },
      };
    }

    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getAoiNgResult(
    timestampFrom: number,
    timestampTo: number,
    lines: string[],
    models: string[]
  ) {
    let that = this;
    // let urlString = 'http://emnrdb03.wks.wistron.com.cn:9200/pcba_aoi_20*/_search';
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[1] + "_search";

    let esQuery: any = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              term: {
                "site.raw": "WKS",
              },
            },
            {
              term: {
                "plant.raw": "F232",
              },
            },
            {
              term: {
                "result.raw": "NG",
              },
            },
            // {
            //   "terms":{
            //     "line.raw": lines
            //   }
            // }, {
            //   "terms":{
            //     "model.raw": models
            //   }
            // },
            {
              range: {
                evt_dt: {
                  from: timestampFrom,
                  to: timestampTo,
                  include_lower: true,
                  include_upper: true,
                },
              },
            },
          ],
        },
      },
      aggs: {
        term_based: {
          range: {
            field: "evt_dt",
            ranges: that.timeConverter.getPeriodList(
              new Date(timestampFrom),
              new Date(timestampTo),
              Constants.PERIOD_TYPE_D
            ),
          },
          aggs: {
            machines: {
              terms: {
                field: "machineName.raw",
                size: 10000,
                order: {
                  _term: "asc",
                },
              },
              aggs: {
                lines: {
                  terms: {
                    field: "line.raw",
                    size: 10000,
                    order: {
                      _term: "asc",
                    },
                  },
                  aggs: {
                    models: {
                      terms: {
                        field: "model.raw",
                        size: 10000,
                        order: {
                          _term: "asc",
                        },
                      },
                      aggs: {
                        programs: {
                          terms: {
                            field: "program.raw",
                            size: 10000,
                            order: {
                              _term: "asc",
                            },
                          },
                          aggs: {
                            nested_locations: {
                              nested: {
                                path: "locations",
                              },
                              aggs: {
                                ng: {
                                  filter: {
                                    bool: {
                                      must: [
                                        {
                                          term: {
                                            "locations.opresult.raw": "NG",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  aggs: {
                                    locations: {
                                      terms: {
                                        field: "locations.location.raw",
                                        size: 10000,
                                        order: {
                                          _term: "asc",
                                        },
                                      },
                                      aggs: {
                                        inspectItems: {
                                          terms: {
                                            field: "locations.inspectItem.raw",
                                            size: 10000,
                                            order: {
                                              _term: "asc",
                                            },
                                          },
                                          aggs: {
                                            rev: {
                                              reverse_nested: {},
                                              aggs: {
                                                usn: {
                                                  terms: {
                                                    field: "usn.raw",
                                                    size: 10000,
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    if (lines.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "line.raw": lines,
        },
      });
    }
    if (!!models && !!models[0] && models.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "model.raw": models,
        },
      });
    }
    // console.log("getAoiNgResult ES URL: ", urlString);
    // console.log("getAoiNgResult ES: ", JSON.stringify(esQuery));
    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getAoiResult(line: string, model: string, usn: string) {
    // let urlString = 'http://emnrdb03.wks.wistron.com.cn:9200/pcba_aoi_20*/_search';
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[1] + "_search";

    let esQuery = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              term: {
                "site.raw": "WKS",
              },
            },
            {
              term: {
                "plant.raw": "F232",
              },
            },
            {
              term: {
                "line.raw": line,
              },
            },
            {
              term: {
                "model.raw": model,
              },
            },
            {
              term: {
                "usn.raw": usn,
              },
            },
          ],
        },
      },
    };

    // console.log("getAoiResult ES URL: ", urlString);
    // console.log("getAoiResult ES: ", JSON.stringify(esQuery));
    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getTrendData(
    timestampFrom: number,
    timestampTo: number,
    lines: string[],
    models: string[],
    mos: string[],
    stage?: string[]
  ) {
    let that = this;
    // let urlString = 'http://emnrdb03.wks.wistron.com.cn:9200/pcba_badanalysis_wks_20*/badanalysis/_search';
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[0] + "_search";

    let esQuery: any = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              term: {
                "site.raw": "WKS",
              },
            },
            {
              term: {
                "plant.raw": "F232",
              },
            },
            {
              terms: {
                // "stage.raw": ["AA", "AG", "TI", "TJ", "TL", "TK"]
                "stage.raw": stage,
              },
            },
            {
              range: {
                evt_dt: {
                  from: timestampFrom,
                  to: timestampTo,
                  include_lower: true,
                  include_upper: true,
                },
              },
            },
          ],
        },
      },
      aggs: {
        stage: {
          terms: {
            size: 10000,
            field: "stage.raw",
          },
          aggs: {
            outputqty: {
              sum: {
                field: "outputqty",
              },
            },
            defectqty: {
              sum: {
                field: "defectqty",
              },
            },
          },
        },
      },
    };
    if (lines.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "line.raw": lines,
        },
      });
    }
    if (models.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "model.raw": models,
        },
      });
    }
    if (mos.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "mo.raw": mos,
        },
      });
    }
    // console.log("getTrendData ES URL: ", urlString);
    // console.log("getTrendData ES: ", JSON.stringify(esQuery));
    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getSpiResult(line: string, model: string, usn: string) {
    // let urlString = "http://emnrdb03.wks.wistron.com.cn:9200/pcba_prdaily_20*/prdaily/_search";
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[2] + "_search";
    let esQuery: any = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              term: {
                "plant.raw": "F232",
              },
            },
            {
              term: {
                "line.raw": line,
              },
            },
            {
              term: {
                "model.raw": model,
              },
            },
            {
              term: {
                "usn.raw": usn,
              },
            },
          ],
        },
      },
    };
    // console.log("getSpiResult ES URL: ", urlString);
    // console.log("getSpiResult ES : ", JSON.stringify(esQuery));
    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getNgTopRank(
    timestampFrom: number,
    timestampTo: number,
    lines: string[],
    models: string[],
    stage?: string[]
  ) {
    let that = this;
    // let urlString = 'http://emnrdb03.wks.wistron.com.cn:9200/pcba_aoi_20*/_search';
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[7] + "_search";

    let esQuery: any = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              term: {
                "site.raw": "WKS",
              },
            },
            {
              term: {
                "plant.raw": "F232",
              },
            },
            {
              range: {
                evt_dt: {
                  from: timestampFrom,
                  to: timestampTo,
                  include_lower: true,
                  include_upper: true,
                },
              },
            },
          ],
        },
      },
      aggs: {
        location: {
          terms: {
            field: "location.raw",
            size: 10000,
          },
          aggs: {
            usn: {
              terms: {
                field: "usn.raw",
                size: 1000,
              },
              // "aggs":{
              //     "subusn": {
              //                 "terms": {
              //                     "field": "subusn.raw",
              //                     "size": 10000
              //                 }
              //             }
              //     }
            },
          },
        },
        error_description: {
          terms: {
            field: "error_description.raw",
            size: 10000,
          },
        },
      },
    };
    if (lines.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "line.raw": lines,
        },
      });
    }
    if (models.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "model.raw": models,
        },
      });
    }
    if (stage && stage.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "stage.raw": stage,
        },
      });
    }
    // console.log("getNgTopRank ES URL: ", urlString);
    // console.log("getNgTopRank ES: ", esQuery);
    // console.log(JSON.stringify(esQuery));

    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getLocationTrendResult(
    timestampFrom: number,
    timestampTo: number,
    lines: string[],
    models: string[],
    stage: string[],
    location: string
  ) {
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[7] + "_search";
    let esQuery: any = {
      size: 0,
      query: {
        bool: {
          must: [
            {
              term: {
                "site.raw": "WKS",
              },
            },
            {
              term: {
                "plant.raw": "F232",
              },
            },
            {
              terms: {
                "stage.raw": stage,
              },
            },
            {
              range: {
                evt_dt: {
                  from: timestampFrom,
                  to: timestampTo,
                  include_lower: true,
                  include_upper: true,
                },
              },
            },
            {
              regexp: {
                location: `.*${location}`,
              },
            },
          ],
        },
      },
      aggs: {
        location: {
          terms: {
            field: "location.raw",
            size: 10000,
          },
          aggs: {
            usn: {
              terms: {
                field: "usn.raw",
                size: 1000,
              },
            },
          },
        },
      },
    };
    if (lines.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "line.raw": lines,
        },
      });
    }
    if (models.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "model.raw": models,
        },
      });
    }
    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getNgTopRankDeatil(
    timestampFrom: number,
    timestampTo: number,
    lines: string[],
    models: string[],
    locations: string[],
    stage?: string[]
  ) {
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[7] + "_search";
    let esQuery: any = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              term: {
                "site.raw": "WKS",
              },
            },
            {
              term: {
                "plant.raw": "F232",
              },
            },
            {
              terms: {
                "stage.raw": stage,
              },
            },
            {
              range: {
                evt_dt: {
                  from: timestampFrom,
                  to: timestampTo,
                  include_lower: true,
                  include_upper: true,
                },
              },
            },
            {
              terms: {
                "location.raw": locations,
              },
            },
          ],
        },
      },
      // "aggs": {
      //       "subusn": {
      //         "terms": {
      //           "field": "subusn.raw",
      //           "size": 10000
      //         }
      //   }
      // }
    };
    if (lines.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "line.raw": lines,
        },
      });
    }
    if (models.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "model.raw": models,
        },
      });
    }
    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getPercentAggByLineAndModel(
    timestampFrom: number,
    timestampTo: number,
    lines: string[],
    models: string[],
    mos: string[]
  ) {
    let that = this;
    // let urlString = 'http://emnrdb03.wks.wistron.com.cn:9200/pcba_badanalysis_wks_20*/badanalysis/_search';
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[0] + "_search";
    let esQuery: any = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              term: {
                "site.raw": "WKS",
              },
            },
            {
              term: {
                "plant.raw": "F232",
              },
            },
            {
              terms: {
                "stage.raw": ["TL", "TK"],
              },
            },
            {
              range: {
                evt_dt: {
                  from: timestampFrom,
                  to: timestampTo,
                  include_lower: true,
                  include_upper: true,
                },
              },
            },
          ],
        },
      },
      aggs: {
        line: {
          terms: {
            size: 10000,
            field: "line.raw",
          },
          aggs: {
            stage: {
              terms: {
                size: 10000,
                field: "stage.raw",
              },
              aggs: {
                outputqty: {
                  sum: {
                    field: "outputqty",
                  },
                },
                defectqty: {
                  sum: {
                    field: "defectqty",
                  },
                },
              },
            },
          },
        },
        model: {
          terms: {
            size: 10000,
            field: "model.raw",
          },
          aggs: {
            stage: {
              terms: {
                size: 10000,
                field: "stage.raw",
              },
              aggs: {
                outputqty: {
                  sum: {
                    field: "outputqty",
                  },
                },
                defectqty: {
                  sum: {
                    field: "defectqty",
                  },
                },
              },
            },
          },
        },
      },
    };
    if (lines.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "line.raw": lines,
        },
      });
    }
    if (models.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "model.raw": models,
        },
      });
    }
    if (mos.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "mo.raw": mos,
        },
      });
    }
    // console.log("getPercentAggByLineAndModel ES URL: ", urlString);
    // console.log("getPercentAggByLineAndModel ES: ", JSON.stringify(esQuery));
    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getXRayData(
    timestampFrom: number,
    timestampTo: number,
    lines: string[],
    models: string[]
  ) {
    // let urlString = "http://emnrdb03.wks.wistron.com.cn:9200/pcba_prdaily_20*/xraylog/_search";
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[3] + "_search";
    let esQuery: any = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              term: {
                "site.raw": "WKS",
              },
            },
            {
              term: {
                "plant.raw": "F232",
              },
            },
            {
              range: {
                evt_dt: {
                  from: timestampFrom,
                  to: timestampTo,
                  include_lower: true,
                  include_upper: true,
                },
              },
            },
          ],
        },
      },
    };
    if (lines.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "line.raw": lines,
        },
      });
    }

    if (models.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "model.raw": models,
        },
      });
    }
    // console.log("getXRayData ES URL: ", urlString);
    // console.log("getXRayData ES: ", JSON.stringify(esQuery));
    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getNgExcelData(
    timestampFrom: number,
    timestampTo: number,
    lines: string[],
    models: string[]
  ) {
    let that = this;
    // let urlString = 'http://emnrdb03.wks.wistron.com.cn:9200/pcba_aoi_20*/_search';
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[1] + "_search";

    let esQuery: any = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              term: {
                "site.raw": "WKS",
              },
            },
            {
              term: {
                "plant.raw": "F232",
              },
            },
            {
              term: {
                "result.raw": "NG",
              },
            },
            {
              range: {
                evt_dt: {
                  from: timestampFrom,
                  to: timestampTo,
                  include_lower: true,
                  include_upper: true,
                },
              },
            },
          ],
        },
      },
      aggs: {
        lines: {
          terms: {
            field: "line.raw",
            size: 10000,
          },
          aggs: {
            nested_locations: {
              nested: {
                path: "locations",
              },
              aggs: {
                ng: {
                  filter: {
                    bool: {
                      must: [
                        {
                          term: {
                            "locations.opresult.raw": "NG",
                          },
                        },
                      ],
                    },
                  },
                  aggs: {
                    locations: {
                      terms: {
                        field: "locations.location.raw",
                        size: 10000,
                      },
                    },
                    inspectItem: {
                      terms: {
                        field: "locations.inspectItem.raw",
                        size: 10000,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        models: {
          terms: {
            field: "model.raw",
            size: 10000,
          },
          aggs: {
            nested_locations: {
              nested: {
                path: "locations",
              },
              aggs: {
                ng: {
                  filter: {
                    bool: {
                      must: [
                        {
                          term: {
                            "locations.opresult.raw": "NG",
                          },
                        },
                      ],
                    },
                  },
                  aggs: {
                    locations: {
                      terms: {
                        field: "locations.location.raw",
                        size: 10000,
                      },
                    },
                    inspectItem: {
                      terms: {
                        field: "locations.inspectItem.raw",
                        size: 10000,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    if (lines.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "line.raw": lines,
        },
      });
    }
    if (models.length > 0) {
      esQuery.query.bool.must.push({
        terms: {
          "model.raw": models,
        },
      });
    }
    // console.log("getNgTopRank ES URL: ", urlString);
    // console.log("getNgTopRank ES: ", JSON.stringify(esQuery));
    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getMounterResult(
    timestampFrom: number,
    timestampTo: number,
    line: string,
    face: string,
    location: string,
    isWrongFace: boolean
  ) {
    let that = this;
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[6] + "_search";

    let esQuery: any = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              term: {
                "site.raw": "WKS",
              },
            },
            {
              term: {
                "plant.raw": "F232",
              },
            },
            {
              term: {
                "line.raw": line,
              },
            },
            {
              range: {
                evt_dt: {
                  from: timestampFrom,
                  to: timestampTo,
                  include_lower: true,
                  include_upper: true,
                },
              },
            },
          ],
        },
      },
    };

    if (face !== "All") {
      if (!isWrongFace) {
        esQuery.query.bool.must.push({
          term: {
            "FACE.raw": face,
          },
        });
      }
    }

    // console.log("getMounterResult ES URL: ", urlString);
    // console.log("getMounterResult ES: ", JSON.stringify(esQuery));
    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getReflowResult(timestampFrom: number, timestampTo: number, line: string) {
    let that = this;
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[4] + "_search";

    let esQuery: any = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              term: {
                "evt_data.site.raw": "WKS",
              },
            },
            {
              term: {
                "evt_data.plant.raw": "F232",
              },
            },
            {
              term: {
                "evt_data.line.raw": line,
              },
            },
            {
              range: {
                evt_dt: {
                  from: timestampFrom,
                  to: timestampTo,
                  include_lower: true,
                  include_upper: true,
                },
              },
            },
          ],
        },
      },
    };
    // console.log("getReflowResult ES URL: ", urlString);
    // console.log("getReflowResult ES: ", JSON.stringify(esQuery));
    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getAllQueryInfos(
    key: any,
    params: any,
    timestampFrom: number,
    timestampTo: number,
    mfgtype: string
  ) {
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[0] + "_search";

    let esQuery = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              term: {
                "evt_data.site.raw": "WKS",
              },
            },
            {
              term: {
                "evt_data.plant.raw": "F232",
              },
            },
            {
              range: {
                evt_dt: {
                  from: timestampFrom,
                  to: timestampTo,
                  include_lower: true,
                  include_upper: true,
                },
              },
            },
          ],
        },
      },
    };

    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getLines(
    mfgtype: string,
    face: string[],
    timestampFrom: number,
    timestampTo: number
  ) {
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[0] + "_search";
    //对face进行处理
    let esQuery = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              term: {
                "site.raw": "WKS",
              },
            },
            {
              term: {
                "mfgtype.raw": mfgtype,
              },
            },
            {
              terms: {
                "stage.raw": face,
              },
            },
            {
              term: {
                "plant.raw": "F232",
              },
            },
            {
              range: {
                evt_dt: {
                  from: timestampFrom,
                  to: timestampTo,
                  include_lower: true,
                  include_upper: true,
                },
              },
            },
          ],
        },
      },
      aggs: {
        lines: {
          terms: {
            field: "line.raw",
            size: 10000,
          },
        },
      },
    };

    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getInfos(
    mfgtype: string[],
    face: string[],
    timestampFrom: number,
    timestampTo: number,
    params: any,
    field: string
  ) {
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[0] + "_search";
    let esQuery: any = {};
    esQuery = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              term: {
                "site.raw": "WKS",
              },
            },
            {
              term: {
                "plant.raw": "F232",
              },
            },
            {
              terms: {
                "mfgtype.raw": mfgtype,
              },
            },
            {
              terms: {
                "stage.raw": face,
              },
            },
            {
              range: {
                evt_dt: {
                  from: timestampFrom,
                  to: timestampTo,
                  include_lower: true,
                  include_upper: true,
                },
              },
            },
          ],
        },
      },
    };
    // esQuery = JSON.parse(JSON.stringify(esQuery));
    for (let key in params) {
      if (params[key].length > 0) {
        if (key.includes("line")) {
          esQuery.query.bool.must.push({
            terms: {
              "line.raw": params[key],
            },
          });
        } else if (key.includes("model")) {
          esQuery.query.bool.must.push({
            terms: {
              "model.raw": params[key],
            },
          });
        } else if (key.includes("upn")) {
          esQuery.query.bool.must.push({
            terms: {
              "upn.raw": params[key],
            },
          });
        } else if (key.includes("mo")) {
          esQuery.query.bool.must.push({
            terms: {
              "mo.raw": params[key],
            },
          });
        }
      }
    }
    if (field.includes("line")) {
      esQuery["aggs"] = {
        lines: {
          terms: {
            field: "line.raw",
            size: 10000,
          },
        },
      };
    } else if (field.includes("model")) {
      esQuery["aggs"] = {
        models: {
          terms: {
            field: "model.raw",
            size: 10000,
          },
        },
      };
    } else if (field.includes("upn")) {
      esQuery["aggs"] = {
        upns: {
          terms: {
            field: "upn.raw",
            size: 10000,
          },
        },
      };
    } else if (field.includes("mo")) {
      esQuery["aggs"] = {
        mos: {
          terms: {
            field: "mo.raw",
            size: 10000,
          },
        },
      };
    }

    // console.log("getInfos: ", urlString);
    // console.log("getInfos: ", JSON.stringify(esQuery));
    esQuery = JSON.stringify(esQuery);
    return this.http.post(urlString, esQuery, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  getNgUsn(subusns: any[], isPost?: boolean) {
    // console.log('subusns>>>',subusns);
    let urlString =
      ConfigDriver.getEsUrl() + ConfigDriver.getIndexs()[10] + "_search";
    let esQuery = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              term: {
                "site.raw": "WKS",
              },
            },
            {
              term: {
                "plant.raw": "F232",
              },
            },
            {
              term: {
                "result.raw": "NG",
              },
            },
            {
              term: {
                "machineName.raw": isPost ? "AOI2" : "AOI1",
              },
            },
            {
              terms: {
                "usn.raw": subusns,
              },
            },
          ],
        },
      },
      aggs: {
        usn: {
          terms: {
            field: "usn.raw",
            size: 1000,
          },
          aggs: {
            top: {
              top_hits: {
                size: 1,
                sort: [
                  {
                    evt_dt: {
                      order: "desc",
                    },
                  },
                ],
              },
            },
          },
        },
      },
    };
    return this.http.post(urlString, esQuery, {
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
}

export function getArgs(func) {
  //匹配函数括号里的参数
  var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];

  //分解参数成数组
  return args
    .split(",")
    .map(function (arg) {
      //去空格和内联注释
      return arg.replace(/\/\*.*\*\//, "").trim();
    })
    .filter(function (args) {
      //确保没有undefineds
      return args;
    });
}

export function getParams(args:IArguments, keys) {
    const params = {};
    keys.forEach((key, index) => {
      Reflect.set(params, key, args[index]);
    });
    return params;
  }