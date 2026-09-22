import type { LogDetailModel } from "../domain/log-detail.model";

export const mapLogDetailRequestModel = (data:any):LogDetailModel => {
    return{
        id:data.id,
        user_id: data.user_id,
        user_name: data.user_name,
        action: data.action,
        module : data.module,
        resource: data.resource,
        description: data.description,
        result: data.result,
        created_at: data.created_at,
        method_http: data.method_http,
        route: data.route,
        ip: data.ip,
        user_agent: data.user_agent,
        browser: data.browser,
        browser_version: data.browser_version,
        os: data.os,
        device: data.device,
        request_id: data.request_id,
        duration: data.duration,
        message_error: data.message_error,
        metadata: data.metadata, 
    }
}