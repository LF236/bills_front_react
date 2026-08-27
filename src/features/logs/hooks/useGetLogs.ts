import { useLazyQuery } from "@apollo/client/react";
import { useLogsStore } from "./useLogsStore"
import { GET_LOGS_QUERY } from "../api/logs.queries";
import { useEffect, useState } from "react";
import { mapLogsRequestToModel } from "../api/mapLogsRequestModel";

export const useGetLogs = () => {
    const {search,action,module,offset,limit} = useLogsStore();

    const [getLogsQuery , {loading,data,error,called}] = useLazyQuery(GET_LOGS_QUERY,{
        fetchPolicy: 'network-only',
    });

    const [logList, setLogList] = useState([]);
    const [total, setTotal ] = useState (0);
    
    useEffect(()=>{
        if(called && data && !loading){
            console.log('Respuesta de los logs',data)
            const {logs} = data as any;
            console.log('Logs', logs);
            const {items = [], total = 0} = logs as any; 

            console.log('Item', items),
            console.log('Total' , total)

            const parsedItems = items.map((item: any) => 
            mapLogsRequestToModel(item));

            setLogList(parsedItems);
            setTotal(total);
        }
    }, [called,data,loading]);

    const getLogs = ()=>{
        //TODO ELIMINAR 
        console.log('Obtencion de variables de logs',{
            search,action,module,offset,limit,paginate:true
        });
        getLogsQuery({
            variables: {
                search,
                action,
                module,
                offset,
                limit,
                paginate : true,
            },
        });
    };

    return{
        logList,
        total,
        getLogs,
        loading,
        error: error || null,
    }
}

