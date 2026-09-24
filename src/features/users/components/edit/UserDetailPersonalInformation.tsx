import { Badge } from '../../../common/components/badge';
import type { UserDetailInterface } from '../../domain/user-detail.interface';

interface Props {
  user: UserDetailInterface;
}

const UserDetailPersonalInformation = ({
  user
}: Props) => {
  return (
    <div className="rounded-xl border border-slate-700 overflow-hidden">
      <div className="px-6 py-3 border-b border-slate-700">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          General Information
        </span>
      </div>

      
      <div className="flex items-center px-6 py-4 border-b border-slate-700">
        <span className="w-44 text-sm text-slate-400">Name</span>
        <span className="text-sm">{user.name}</span>
      </div>

      <div className="flex items-center px-6 py-4 border-b border-slate-700">
        <span className="w-44 text-sm text-slate-400">Email</span>
        <span className="text-sm">{user.email}</span>
      </div>
      
      <div className="flex items-center px-6 py-4 border-b border-slate-700">
        <span className="w-44 text-sm text-slate-400">State</span>
        { user.is_active ? (
        <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium text-green-400">
          <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-green-400">
            <circle r={3} cx={3} cy={3} />
          </svg>
          Active
        </span>
        ) : (
        <span className="inline-flex items-center gap-x-1.5 rounded-full bg-red-500/15 px-3 py-1 text-xs font-medium text-red-400">
          <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-red-400">
            <circle r={3} cx={3} cy={3} />
          </svg>
          Deactive
        </span>
        )
        }
      </div>

      <div className="flex items-center px-6 py-4 border-b border-slate-700">
        <span className="w-44 text-sm text-slate-400">User ID</span>
        <span className="text-sm text-slate-400 font-mono">{user.id}</span>
      </div>

      <div className="flex items-center px-6 py-4 border-b border-slate-700">
        <span className="w-44 text-sm text-slate-400">Created at</span>
        <span className="text-sm">{new Date(user.created_at).toLocaleDateString('es-MX')}</span>
      </div>

      <div className="flex items-center px-6 py-4">
        <span className="w-44 text-sm text-slate-400">Rols</span>
        <div className="flex flex-wrap gap-2">
          {user.roles.map(role => (
            <Badge key={role.id} color="indigo" className='!w-auto'>{role.name}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetailPersonalInformation;
