import type { ReportData } from "@/config/get-report-data";
import { RATING_MAP } from "@/config/config";
import books from "../../books.json";

const buildReportHtml = (report: ReportData): string => {
  const today = new Date().toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const topExpensiveRows = report.topExpensive
    .map(
      (b) => `
      <tr>
        <td>${replaceHtml(b.title)}</td>
        <td>£${b.price.toFixed(2)}</td>
      </tr>`,
    )
    .join("");

  const allBooksRows = report.allBooks
    .map(
      (b) => `
      <tr>
        <td>${replaceHtml(b.title)}</td>
        <td>£${b.price}</td>
        <td>${b.rating}</td>
      </tr>`,
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { font-family: Arial, sans-serif; font-size: 12px; color: #222; }
      h1 { font-size: 20px; margin-bottom: 4px; }
      .meta { color: #666; margin-bottom: 24px; }
      .totals { display: flex; gap: 40px; margin-bottom: 24px; }
      .totals div { font-size: 14px; }
      .totals strong { display: block; font-size: 18px; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
      th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid #ddd; }
      th { background: #f4f4f4; }
      thead { display: table-header-group; }
      tr { break-inside: avoid; }
      h2 { font-size: 15px; margin-top: 32px; }
    </style>
  </head>
  <body>
    <h1>Bookstore Report</h1>
    <div class="meta">Generated ${today}</div>

    <div class="totals">
      <div>Total books<strong>${report.totalBooks}</strong></div>
      <div>Average price<strong>£${report.averagePrice.toFixed(2)}</strong></div>
    </div>

    <h2>Top 5 most expensive</h2>
    <table>
      <thead><tr><th>Title</th><th>Price</th></tr></thead>
      <tbody>${topExpensiveRows}</tbody>
    </table>

    <h2>All books</h2>
    <table>
      <thead><tr><th>Title</th><th>Price</th><th>Rating</th></tr></thead>
      <tbody>${allBooksRows}</tbody>
    </table>
  </body>
  </html>
  `;
};

const replaceHtml = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

export default buildReportHtml;
