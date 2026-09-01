export type Report = {
  id: string;
  topic: string;
  status: "pending" | "done";
  result?: string;
};

export const reports = new Map<string, Report>();
