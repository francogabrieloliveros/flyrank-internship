import { Inngest } from "inngest";
import { reports } from "@/reports/reports";

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
  },
  async ({ event, step }) => {
    const { id, topic } = event.data;

    await step.sleep("do-the-slow-work", "8s");

    await step.run("build-report", async () => {
      const report = reports.get(id);
      if (report) {
        report.status = "done";
        report.result = `Report about ${topic}: here are some fascinating facts...`;
      }
    });
  },
);

export const functions = [sayHello, makeReport];
