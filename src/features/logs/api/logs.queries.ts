import { gql } from "@apollo/client";

export const GET_LOGS_QUERY = gql`
    query Logs($offset: Int,$limit: Int,$paginate: Boolean,$search: String,$action: String ,$module: String) {
        logs(offset: $offset,limit: $limit,paginate: $paginate,search: $search,action: $action,module: $module) {
            total
            items {
                id
                user_name
                action
                module
                resource
                result
                method_http
                created_at
            }
        }
    }
`;

export const GET_CATALOG_LOGS_QUERY = gql`
    query Catalogs($type: CatalogLogTypes!){
        calogs(type: $type){
            values  
        }
    }
`;