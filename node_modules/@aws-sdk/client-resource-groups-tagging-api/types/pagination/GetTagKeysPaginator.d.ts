import { GetTagKeysCommandInput, GetTagKeysCommandOutput } from "../commands/GetTagKeysCommand";
import { ResourceGroupsTaggingAPIPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateGetTagKeys(config: ResourceGroupsTaggingAPIPaginationConfiguration, input: GetTagKeysCommandInput, ...additionalArguments: any): Paginator<GetTagKeysCommandOutput>;
