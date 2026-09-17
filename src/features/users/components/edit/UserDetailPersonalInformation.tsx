import React from 'react';
import { Badge } from '../../../common/components/badge';

const rows = [
  { label: 'Name', value: 'Marco Hernández' },
  { label: 'Email', value: 'marco.hernandez@empresa.com' },
];

const UserDetailPersonalInformation = () => {
  const roles = ['admin', 'default_user'];

  return (
    <div className="rounded-xl border border-slate-700 overflow-hidden">
      <div className="px-6 py-3 border-b border-slate-700">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          General Information
        </span>
      </div>

      {rows.map(({ label, value }) => (
        <div key={label} className="flex items-center px-6 py-4 border-b border-slate-700">
          <span className="w-44 text-sm text-slate-400">{label}</span>
          <span className="text-sm">{value}</span>
        </div>
      ))}

      <div className="flex items-center px-6 py-4 border-b border-slate-700">
        <span className="w-44 text-sm text-slate-400">State</span>
        <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium text-green-400">
          <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-green-400">
            <circle r={3} cx={3} cy={3} />
          </svg>
          Active
        </span>
      </div>

      <div className="flex items-center px-6 py-4 border-b border-slate-700">
        <span className="w-44 text-sm text-slate-400">User ID</span>
        <span className="text-sm text-slate-400 font-mono">3f8d2c1a-e47b-4a9d-bc12-5e60f91a2d08</span>
      </div>

      <div className="flex items-center px-6 py-4 border-b border-slate-700">
        <span className="w-44 text-sm text-slate-400">Created at</span>
        <span className="text-sm">14 mar 2025</span>
      </div>

      <div className="flex items-center px-6 py-4">
        <span className="w-44 text-sm text-slate-400">Rols</span>
        <div className="flex flex-wrap gap-2">
          {roles.map(role => (
            <Badge key={role} color="indigo">{role}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetailPersonalInformation;
