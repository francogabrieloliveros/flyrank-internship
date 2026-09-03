import getReportData from "./get-report-data";

const report = getReportData();
console.log(JSON.stringify(report, null, 2));
