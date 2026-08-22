import cases from "./cases.json" with { type: "json" };

const ENDPOINT = "http://localhost:3000/triage";

async function main() {
  const promises = cases.map(async (tcase) => {
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: tcase.prompt }),
      });
      const body = await res.json();

      if (!res.ok || !body?.data) {
        return { pass: false, reason: `Request failed (status ${res.status})` };
      }

      return {
        pass: body.data.category === tcase.expectedCategory,
        reason: "LLM categorized successfully.",
      };
    } catch (err) {
      return { pass: false, reason: `Network/parse error: ${err.message}` };
    }
  });

  const results = await Promise.all(promises);

  results.forEach((r) =>
    console.log(`${r.pass ? "PASS" : "FAIL"}: ${r.reason}`),
  );

  console.log("---------------------------------------------");

  const passed = results.filter((r) => r.pass).length;
  const total = results.length;
  const pct = ((passed / total) * 100).toFixed(1);
  console.log(`${passed}/${total} matched (${pct}%)`);
}

main();
