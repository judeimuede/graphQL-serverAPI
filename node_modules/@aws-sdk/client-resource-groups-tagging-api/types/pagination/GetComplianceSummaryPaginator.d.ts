import { GetComplianceSummaryCommandInput, GetComplianceSummaryCommandOutput } from "../commands/GetComplianceSummaryCommand";
import { ResourceGroupsTaggingAPIPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateGetComplianceSummary(config: ResourceGroupsTaggingAPIPaginationConfiguration, input: GetComplianceSummaryCommandInput, ...additionalArguments: any): Paginator<GetComplianceSummaryCommandOutput>;
