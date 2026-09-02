import { Inngest } from "inngest";
import { reports } from "@/reports/reports";
import { fail } from "assert/strict";
import { count } from "console";

export const inngest = new Inngest({ id: "report-api" });

const sayHello = inngest.createFunction(
  { id: "say-hello", triggers: [{ event: "test/hello" }] },
  async ({ step }) => {
    await step.sleep("wait-a-moment", "5s");
    return "Hello from the background!";
  },
);

const makeReport = inngest.createFunction(
  {
    id: "make-report",
    triggers: [{ event: "report/requested" }],
    retries: 2,
    onFailure: async ({ event }) => {
      const { id } = event.data.event.data;
      const report = reports.get(id);
      if (report) {
        report.status = "failed";
      }
    },
  },
  async ({ event, step }) => {
    const { id, topic } = event.data;

    await step.sleep("do-the-slow-work", "8s");

    await step.run("build-report", async () => {
      if (topic === "fail") {
        throw new Error("The report oven is broken!");
      }

      const report = reports.get(id);
      if (report) {
        report.status = "done";
        report.result = `Report about ${topic}: here are some fascinating facts...`;
      }
    });
  },
);

const heartbeat = inngest.createFunction(
  {
    id: "heartbeat",
    triggers: [{ cron: "* * * * *" }],
  },
  async () => {
    let pendingCount = 0;
    let doneCount = 0;
    let failedCount = 0;

    reports.forEach((rep) => {
      if (rep.status === "pending") pendingCount++;
      else if (rep.status === "done") doneCount++;
      else if (rep.status === "failed") failedCount++;
    });

    console.log(
      `Pending: ${pendingCount}, Done: ${doneCount}, Failed: ${failedCount}`,
    );
  },
);

export const functions = [sayHello, makeReport, heartbeat];
