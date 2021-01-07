"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateGetTagKeys = void 0;
const ResourceGroupsTaggingAPI_1 = require("../ResourceGroupsTaggingAPI");
const ResourceGroupsTaggingAPIClient_1 = require("../ResourceGroupsTaggingAPIClient");
const GetTagKeysCommand_1 = require("../commands/GetTagKeysCommand");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new GetTagKeysCommand_1.GetTagKeysCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.getTagKeys(input, ...args);
};
async function* paginateGetTagKeys(config, input, ...additionalArguments) {
    // ToDo: replace with actual type instead of typeof input.PaginationToken
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.PaginationToken = token;
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
exports.paginateGetTagKeys = paginateGetTagKeys;
//# sourceMappingURL=GetTagKeysPaginator.js.map