export interface Log {
    id: string;
    user_name: string | null;
    action : string;
    module : string;
    resource : string;
    result : 'success' | 'error' | 'warning'; 
    method_http : string | null;
    created_at: string; 
}