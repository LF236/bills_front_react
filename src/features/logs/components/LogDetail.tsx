import { Badge } from "../../common/components/badge";
import { Button } from "../../common/components/button";
import { Container } from "../../common/components/Container";
import { Heading } from "../../common/components/heading";
import { useGetLog } from "../hooks/useGetLog";
import type { LogDetailModel } from "../domain/log-detail.model";
import { LogMetadata } from "./LogMetadata";
import { LogDetailField } from "./LogDetailField";

interface LogDetailProps {
  id: string;
}

const formatLogDate = (dateString: string): string => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
};

type BadgeColor = React.ComponentProps<typeof Badge>["color"];

const getMethodColor = (method: string): BadgeColor => {
  switch (method.toUpperCase()) {
    case "DELETE":
      return "red";
    case "GET":
      return "blue";
    case "POST":
      return "green";
    case "PUT":
      return "yellow";
    case "PATCH":
      return "yellow";
    default:
      return "zinc";
  }
};

const getResultColor = (
  result: LogDetailModel["result"]
): BadgeColor => {
  switch (result) {
    case "error":
      return "red";
    case "warning":
      return "yellow";
    case "success":
    default:
      return "green";
  }
};

const DetailSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 w-40 rounded bg-gray-200 dark:bg-[#1a2030]" />
      <div className="h-8 w-72 rounded bg-gray-200 dark:bg-[#1a2030]" />

      {[1, 2, 3].map((card) => (
        <div
          key={card}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-[#262d40] dark:bg-[#131825]">
          <div className="h-14 bg-gray-100 dark:bg-[#1a2030]" />

          <div className="grid grid-cols-1 gap-6 p-7 sm:grid-cols-2">
            {Array.from({
              length: card === 3 ? 2 : 6,
            }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-[#1a2030]" />
                <div className="h-5 w-40 rounded bg-gray-200 dark:bg-[#1a2030]" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const LogDetail = ({ id }: LogDetailProps) => {
  const { log, loading, error } = useGetLog(id);

  if (loading) {
    return (
      <Container className="py-8">
        <DetailSkeleton />
      </Container>
    );
  }

  if (error || !log) {
    const errorMessage =
      error?.message || "Unable to retrieve the log entry.";

    return (
      <Container className="flex min-h-[60vh] items-center justify-center py-8">
        <div className="w-full max-w-[700px] overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm dark:border-[#262d40] dark:bg-[#131825] dark:shadow-none">
          <div className="border-b border-gray-200 bg-gray-50/50 px-7 py-4 dark:border-[#262d40] dark:bg-transparent">
            <div className="flex w-full justify-between">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-[#7c879e]">
                Registration Details
              </h2>

              <h2 className="text-[11px] font-bold uppercase tracking-widest text-red-600 dark:text-[#f87171]">
                ERROR — ID NOT FOUND
              </h2>
            </div>
          </div>

          <div className="flex min-h-[250px] flex-col items-center justify-center p-10 text-center">
            <div className="text-[15px] font-medium text-red-600 dark:text-[#f87171]">
              Unable to retrieve the log entry
            </div>

            <p className="mt-2 max-w-lg wrap-break-word text-[13px] text-gray-500 dark:text-[#7c879e]">
              {errorMessage}
            </p>

            <Button
              href="/logs"
              variant="outline"
              className="mt-6 border-gray-200 bg-white px-4 py-2 text-xs text-gray-700 transition-colors hover:bg-gray-50 dark:border-[#262d40] dark:bg-[#131825] dark:text-[#cbd5e1] dark:hover:bg-[#1a2030]"
            >
              ← Back to list
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  const browser =
    log.browser && log.browser_version
      ? `${log.browser} ${log.browser_version}`
      : log.browser || log.browser_version;

  const isError = log.result === "error";

  return (
    <Container className="py-8 text-gray-900 dark:text-[#cbd5e1]">
      <div className="mb-8">
        <Button
          href="/logs"
          variant="outline"
          className="flex items-center gap-2 rounded-md border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 transition-colors hover:bg-gray-50 dark:border-[#262d40] dark:bg-[#131825] dark:text-[#94a3b8] dark:hover:bg-[#1a2030]"
        >
          &lt; Back to list
        </Button>

        <div className="mt-7">
          <Heading className="text-xl font-semibold text-gray-900 dark:text-white">
            Registration Details
          </Heading>

          <p className="mt-1 break-all font-mono text-[13px] text-gray-500 dark:text-[#7c879e]">
            {log.id}
          </p>
        </div>
      </div>

      <section className="mb-6 overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm dark:border-[#262d40] dark:bg-[#131825] dark:shadow-none">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3.5 dark:border-[#262d40] dark:bg-[#1a2030]">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-[#7c879e]">
            GENERAL INFORMATION
          </h2>
        </div>

        <dl className="grid grid-cols-1 gap-x-12 gap-y-7 p-6 sm:grid-cols-2">
          <LogDetailField label="ID" value={log.id} />

          <LogDetailField
            label="USER"
            value={log.user_name ?? "System"}
          />

          <LogDetailField label="ACTION" value={log.action} />

          <LogDetailField label="MODULE" value={log.module} />

          <LogDetailField label="RESOURCE" value={log.resource} />

          <LogDetailField
            label="RESULT"
            value={
              <Badge
                color={getResultColor(log.result)}
                className="uppercase"
              >
                {log.result}
              </Badge>
            }
          />

          <LogDetailField
            label="DESCRIPTION"
            value={log.description}
            className="wrap-break-word sm:col-span-2"
          />

          <LogDetailField
            label="DATE & TIME"
            value={formatLogDate(log.created_at)}
            className="sm:col-span-2"
          />
        </dl>
      </section>

      <section className="mb-6 overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm dark:border-[#262d40] dark:bg-[#131825] dark:shadow-none">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3.5 dark:border-[#262d40] dark:bg-[#1a2030]">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-[#7c879e]">
            REQUEST INFORMATION
          </h2>
        </div>

        <dl className="grid grid-cols-1 gap-x-12 gap-y-7 overflow-hidden p-6 sm:grid-cols-2">
          {log.method_http && (
            <LogDetailField
              label="HTTP METHOD"
              value={
                <Badge color={getMethodColor(log.method_http)}>
                  {log.method_http.toUpperCase()}
                </Badge>
              }
            />
          )}

          {log.route && (
            <LogDetailField
              label="ROUTE"
              value={
                <span className="break-all font-mono text-[12px]">
                  {log.route}
                </span>
              }
            />
          )}

          {log.ip && (
            <LogDetailField
              label="IP"
              value={log.ip}
            />
          )}

          {log.request_id && (
            <LogDetailField
              label="REQUEST ID"
              value={
                <span className="break-all font-mono text-[12px]">
                  {log.request_id}
                </span>
              }
            />
          )}

          {browser && (
            <LogDetailField
              label="BROWSER"
              value={browser}
            />
          )}

          {log.os && (
            <LogDetailField label="OPERATING SYSTEM" value={log.os}/>
          )}

          {log.device && (
            <LogDetailField label="DEVICE" value={log.device}
            />
          )}

          {log.duration !== null &&
            log.duration !== undefined && (
              <LogDetailField label="DURATION" value={`${log.duration} ms`}/>
            )}

          {log.user_agent && (
            <LogDetailField label="USER AGENT" className="overflow-hidden sm:col-span-2"
              value={
                <span title={log.user_agent} className="block w-full max-w-full truncate font-mono text-[12px] text-gray-500 dark:text-[#7c879e]">
                  {log.user_agent}
                </span>
              }
            />
          )}
        </dl>
      </section>

      <section
        className={`overflow-hidden rounded-md border shadow-sm dark:shadow-none ${
          isError ? "border-red-200 bg-red-50/20 dark:border-[#5c242a] dark:bg-[#131825]" : "border-gray-200 bg-white dark:border-[#262d40] dark:bg-[#131825]"
        }`}
      >
        <div
          className={`border-b px-6 py-3.5 ${
            isError ? "border-red-200 bg-red-50 dark:border-[#5c242a] dark:bg-[#2f181c]" : "border-gray-200 bg-gray-50 dark:border-[#262d40] dark:bg-[#1a2030]"
          }`}
        >
          <h2
            className={`text-[11px] font-bold uppercase tracking-widest ${
                isError ? "text-red-600 dark:text-[#f87171]" : "text-gray-500 dark:text-[#7c879e]"}`}>
            RESULT
          </h2>
        </div>

        <div className="p-6">
          {isError && log.message_error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-5 dark:border-[#5c242a] dark:bg-[#2c171b]">
              <div className="min-w-0">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-red-600 dark:text-[#f87171]">
                  ERROR MESSAGE
                </h3>

                <p className="mt-1.5 wrap-break-word text-[13px] leading-relaxed text-red-700 dark:text-[#fca5a5]">
                  {log.message_error}
                </p>
              </div>
            </div>
          )}

          {log.metadata !== null && log.metadata !== undefined && (
              <div className={isError && log.message_error ? "mt-6" : ""}>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-[#7c879e]">METADATA</h3>
                <LogMetadata metadata={log.metadata} />
              </div>
            )}
        </div>
      </section>
    </Container>
  );
};