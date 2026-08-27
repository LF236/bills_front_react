import { useEffect, useState } from 'react';
import { useLogsStore } from '../hooks/useLogsStore';
import { useGetLogs } from '../hooks/useGetLogs';
import { useGetCatalogLogs } from '../hooks/useGetCatalogLogs';
import { Input } from '../../common/components/input';
import { SelectField } from '../../common/components/Fields';
import { Button } from '../../common/components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../common/components/table';
import type { Log } from '../domain/log.model';
import PaginationComponent from '../../common/components/pagination/PaginationComponent';
import { Badge } from '../../common/components/badge';

export const LogsTable = () => {
    const {search,action,module,offset,limit,setSearch, setAction, setModule,reset,nextPage,previousPage,setLimit,moveByPagination} = useLogsStore();
    const [localSearch, setLocalSearch] = useState('');

    const {logList, total, getLogs, loading, error} = useGetLogs();

    const {actionOptions,moduleOptions} = useGetCatalogLogs();

    const formatLogDate = (dateString: string) : string  => {
        const date = new Date (dateString);
        return new Intl.DateTimeFormat('es-MX',{
            day:'2-digit',
            month:'short',
            year:'numeric',
            hour:'2-digit',
            hour12: false
        }).format(date)
    }
    
    const handleReset = () => {
        setLocalSearch('');
        reset();
    }

    useEffect(()=>{
        getLogs();
    },[search,action,module,offset,limit]);

    if(loading) return <p>Loading ....</p>;

    if(error){
        return <p>Error : Error loading logs</p>;
    }
  return (
    <>
      <div className='mt-8 w-full flex flex-col gap-4 sm:flex-row sm:items-end'>
        <Input className='w-full'
        type='text'
        placeholder='Search logs ... Enter to search'
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        onKeyDown={(e)=>{
            if(e.key === 'Enter'){
                if(e.currentTarget.value.trim() === ''){
                    setSearch('')
                }else{
                    setSearch(e.currentTarget.value);
                }
            }
        }}/>

        <SelectField 
        label='action'
        value={action}
        onChange={(e) => setAction(e.target.value)}
        className='w-full sm:w-48'>
            <option value=''>All actions</option>

            {actionOptions.map((option)=>(
                <option key={option} value={option}>{option}</option>
            ))}
        </SelectField>

        <SelectField
        label='module'
        value={module}
        onChange={(e) => setModule (e.target.value)}
        className='w-full sm:w-48'>
            <option value=''>All modules</option>
            {moduleOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}

        </SelectField>

        <Button onClick={handleReset}>Reset</Button>
        
      </div>
      <Table className='mt-2 [--gutter:--spacing(8)] lg:[--gutter:--spacing(10)]'>
        <TableHead>
            <TableRow className='select-none'>
                <TableHeader>ID</TableHeader>
                <TableHeader>User</TableHeader>
                <TableHeader>Action</TableHeader>
                <TableHeader>Module</TableHeader>
                <TableHeader>Resource</TableHeader>
                <TableHeader>Result</TableHeader>
                <TableHeader>HTTP Method</TableHeader>
                <TableHeader>Create At</TableHeader>
            </TableRow>
        </TableHead>

        <TableBody>
            {logList.map((log:Log) => (
                <TableRow key={log.id}>
                    <TableCell>{log.id.slice(0,8)}</TableCell>

                    <TableCell>{log.user_name ?? 'System'}</TableCell>

                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.module}</TableCell>
                    <TableCell>{log.resource}</TableCell>
                    <TableCell>
                        <Badge color={log.result === 'success'?'green': log.result === 'error' ?'red' : 'yellow'}>{log.result}</Badge>
                    </TableCell>
                    <TableCell>{log.method_http}</TableCell>
                    <TableCell>{formatLogDate(log.created_at)}</TableCell>
                </TableRow>

            ))}
        </TableBody>
      </Table>

      <PaginationComponent
      offset={offset}
      limit={limit}
      next={nextPage || (()=>{})}
      previous={previousPage || (()=> {})}
      setLimit={setLimit}
      moveByPagination={moveByPagination}
      total={total}/>
    </>
  )
}

