import { GetTagValuesCommandInput, GetTagValuesCommandOutput } from "../commands/GetTagValuesCommand";
import { ResourceGroupsTaggingAPIPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateGetTagValues(config: ResourceGroupsTaggingAPIPaginationConfiguration, input: GetTagValuesCommandInput, ...additionalArguments: any): Paginator<GetTagValuesCommandOutput>;
