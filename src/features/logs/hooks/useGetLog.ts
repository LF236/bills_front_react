import { useQuery } from "@apollo/client/react"
import { GET_LOG_QUERY } from "../api/logs.queries"
import type { LogDetailModel } from "../domain/log-detail.model";
import { mapLogDetailRequestModel } from "../api/mapLogDetailRequestModel";

export const useGetLog = (id : string) => {
    const {loading,data,error} = useQuery(GET_LOG_QUERY,{
        variables:{
            id, 
        },
        fetchPolicy:'network-only',
    });

    const response = data as {log?: any}
    
    const log: LogDetailModel | null = response?.log ? mapLogDetailRequestModel(response.log):null;

    return{
        log,
        loading,
        error: error || null,
    };
};
