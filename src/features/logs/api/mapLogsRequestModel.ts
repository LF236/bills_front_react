import type { Log } from "../domain/log.model"

export const mapLogsRequestToModel = (data : any) : Log => {
    return {
        id : data.id,
        user_name : data.user_name,
        action : data.action,
        module : data.module,
        resource : data.resource,
        result: data.result,
        method_http: data.method_http,
        created_at: data.created_at,
    }
}