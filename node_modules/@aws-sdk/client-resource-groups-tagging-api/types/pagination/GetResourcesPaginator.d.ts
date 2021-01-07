import { GetResourcesCommandInput, GetResourcesCommandOutput } from "../commands/GetResourcesCommand";
import { ResourceGroupsTaggingAPIPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateGetResources(config: ResourceGroupsTaggingAPIPaginationConfiguration, input: GetResourcesCommandInput, ...additionalArguments: any): Paginator<GetResourcesCommandOutput>;
