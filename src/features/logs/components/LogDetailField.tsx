import type { ReactNode } from "react";

interface LogDetailFieldProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export const LogDetailField = ({
  label,
  value,
  className = "",
}: LogDetailFieldProps) => {
  return (
    <div className={className}>
      <dt className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-[#7c879e]">
        {label}
      </dt>

      <dd className="mt-1.5 min-w-0 text-[13px] text-gray-900 dark:text-[#cbd5e1]">
        {value}
      </dd>
    </div>
  );
};