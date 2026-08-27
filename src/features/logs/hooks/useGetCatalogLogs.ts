import { useLazyQuery } from "@apollo/client/react"
import { GET_CATALOG_LOGS_QUERY } from "../api/logs.queries"
import {useEffect, useState } from "react";

export const useGetCatalogLogs = () => {
    const [getActionCatalog] = useLazyQuery(GET_CATALOG_LOGS_QUERY,{
        fetchPolicy: 'network-only',
    });

    const [getModuleCatalog] = useLazyQuery(GET_CATALOG_LOGS_QUERY,{
        fetchPolicy: 'network-only'
    })

    const [actionOptions, setActionOptions] = useState<string[]>([]);
    const [moduleOptions, setModuleOptions] = useState<string[]>([]);

    useEffect(()=>{
        const getCatalogs = async () => {
            try{
                const [actionResponse, moduleResponse] = await Promise.all([
                    getActionCatalog({
                        variables:{
                            type:'ACTION',
                        },
                    }),
                    getModuleCatalog({
                        variables:{
                            type: 'MODULE',
                        },
                    }),
                ]);
                setActionOptions(
                    (actionResponse.data as any)?.calogs?.values ?? []
                );
                setModuleOptions(
                    (moduleResponse.data as any)?.calogs?.values ?? []
                );
            }catch(error){
                console.error('error loading log catalogs', error);
            }
        };
        getCatalogs();
    }, [getActionCatalog, getModuleCatalog]);

    return{
        actionOptions,
        moduleOptions,
    };
};

