export type Report = {
  id: string;
  topic: string;
  status: "pending" | "done" | "failed";
  result?: string;
};

export const reports = new Map<string, Report>();
