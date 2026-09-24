export interface LogDetailModel {
    id:string;
    user_id:string;
    user_name:string | null;
    action:string;
    module:string;
    resource:string;
    description:string;
    result: 'success' | 'error' | 'warning';
    created_at:string;
    method_http:string | null;
    route:string | null;
    ip: string | null;
    user_agent: string | null;
    browser : string | null;
    browser_version: string | null;
    os: string | null;
    device: string | null;
    request_id: string | null;
    duration: number | null;
    message_error: string | null;
    metadata: any | null;
}