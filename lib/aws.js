const {
  ClientDefaults,
  ResourceGroupsTaggingAPI,
} = require("@aws-sdk/client-resource-groups-tagging-api");

class AwsResources {
  resourceList = [];
  constructor() {}

  extractR = (data) =>
    data.ResourceTagMappingList.map((x) => this.explodeARN(x));

  listAll = async (accessKeyId, secretAccessKey, region) => {

    let config = {
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    };

    const resourcegroupstaggingapi = new ResourceGroupsTaggingAPI(config);

    let params = { paginationToken: "" };

    do {
      let y = await new Promise((resolve, reject) => {
        resourcegroupstaggingapi.getResources(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              result: this.extractR(data),
              PaginationToken: data.PaginationToken,
            });
          }
        });
      });
      this.resourceList.push(...y.result);
      params.PaginationToken = y.PaginationToken;
    } while (params.PaginationToken != "");

    return this.resourceList;
  };

  explodeARN = (x) => {
    let o = {
      partition: "",
      service: "",
      region: "",
      accountId: "",
      resourceType: "",
      resourceId: "",
    };
    try {
      let aa = x.ResourceARN.split(":");
      if (aa.length == 6) {
        o.partition = aa[1];
        o.service = aa[2];
        o.region = aa[3];
        o.accountId = aa[4];
        let k = aa[5].split("/");
        if (k.length > 1) {
          o.resourceId = k[1];
          o.resourceType = k[0];
        } else {
          o.resourceId = aa[5];
        }
      }
      if (aa.length == 7) {
        o.partition = aa[1];
        o.service = aa[2];
        o.region = aa[3];
        o.accountId = aa[4];
        o.resourceType = aa[5];
        o.resourceId = aa[6];
      }
    } catch (error) {
      console.log(error);
    } finally {
      return o;
    }
  };
}

module.exports = {
  AwsResources: AwsResources,
};
