"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateGetResources = void 0;
const ResourceGroupsTaggingAPI_1 = require("../ResourceGroupsTaggingAPI");
const ResourceGroupsTaggingAPIClient_1 = require("../ResourceGroupsTaggingAPIClient");
const GetResourcesCommand_1 = require("../commands/GetResourcesCommand");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new GetResourcesCommand_1.GetResourcesCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.getResources(input, ...args);
};
async function* paginateGetResources(config, input, ...additionalArguments) {
    // ToDo: replace with actual type instead of typeof input.PaginationToken
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.PaginationToken = token;
        input["ResourcesPerPage"] = config.pageSize;
        if (config.client instanceof ResourceGroupsTaggingAPI_1.ResourceGroupsTaggingAPI) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof ResourceGroupsTaggingAPIClient_1.ResourceGroupsTaggingAPIClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected ResourceGroupsTaggingAPI | ResourceGroupsTaggingAPIClient");
        }
        yield page;
        token = page.PaginationToken;
        hasNext = !!token;
    }
    // @ts-ignore
    return undefined;
}
exports.paginateGetResources = paginateGetResources;
//# sourceMappingURL=GetResourcesPaginator.js.map