import type { ReactNode } from "react";

interface LogMetadataProps {
  metadata: unknown;
}

const formatJSON = (value: unknown): ReactNode => {
  const renderValue = (
    currentValue: unknown,
    indent = 0
  ): ReactNode => {
    const spacing = " ".repeat(indent);

    if (currentValue === null) {
      return (
        <span className="text-red-600 dark:text-[#e06c75]">
          null
        </span>
      );
    }

    if (typeof currentValue === "string") {
      return (
        <span className="text-emerald-600 dark:text-[#98c379]">
          {JSON.stringify(currentValue)}
        </span>
      );
    }

    if (typeof currentValue === "number") {
      return (
        <span className="text-orange-600 dark:text-[#d19a66]">
          {currentValue}
        </span>
      );
    }

    if (typeof currentValue === "boolean") {
      return (
        <span className="text-purple-600 dark:text-[#c678dd]">
          {String(currentValue)}
        </span>
      );
    }

    if (Array.isArray(currentValue)) {
      return (
        <>
          <span className="text-gray-800 dark:text-[#cbd5e1]">
            [
          </span>

          {currentValue.map((item, index) => (
            <div key={index}>
              {" ".repeat(indent + 2)}

              {renderValue(item, indent + 2)}

              {index < currentValue.length - 1 && (
                <span className="text-gray-800 dark:text-[#cbd5e1]">
                  ,
                </span>
              )}
            </div>
          ))}

          {currentValue.length > 0 && (
            <span className="text-gray-800 dark:text-[#cbd5e1]">
              {spacing}
            </span>
          )}

          <span className="text-gray-800 dark:text-[#cbd5e1]">
            ]
          </span>
        </>
      );
    }

    if (typeof currentValue === "object") {
      const entries = Object.entries(
        currentValue as Record<string, unknown>
      );

      return (
        <>
          <span className="text-gray-800 dark:text-[#cbd5e1]">
            {"{"}
          </span>

          {entries.map(([key, item], index) => (
            <div key={key}>
              {" ".repeat(indent + 2)}

              <span className="text-blue-600 dark:text-[#7eb6f6]">
                {JSON.stringify(key)}
              </span>

              <span className="text-gray-800 dark:text-[#cbd5e1]">
                :{" "}
              </span>

              {renderValue(item, indent + 2)}

              {index < entries.length - 1 && (
                <span className="text-gray-800 dark:text-[#cbd5e1]">
                  ,
                </span>
              )}
            </div>
          ))}

          {entries.length > 0 && (
            <span className="text-gray-800 dark:text-[#cbd5e1]">
              {spacing}
            </span>
          )}

          <span className="text-gray-800 dark:text-[#cbd5e1]">
            {"}"}
          </span>
        </>
      );
    }

    return (
      <span className="text-gray-800 dark:text-[#cbd5e1]">
        {String(currentValue)}
      </span>
    );
  };

  return renderValue(value);
};

export const LogMetadata = ({
  metadata,
}: LogMetadataProps) => {
  return (
    <pre className="mt-2.5 max-h-[400px] overflow-x-auto overflow-y-auto whitespace-pre rounded-md border border-gray-200 bg-gray-50 p-5 font-mono text-[13px] leading-relaxed dark:border-[#262d40] dark:bg-[#0b0e14]">
      {formatJSON(metadata)}
    </pre>
  );
};