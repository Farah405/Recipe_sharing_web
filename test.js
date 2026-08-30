const http = require("http");

const tests = [
    { name: "Health Check",         url: "/" },
    { name: "Search: chicken",      url: "/recipes/search?search=chicken" },
    { name: "Filter: dessert",      url: "/recipes/filter?category=dessert" },
    { name: "Mine (no token)",      url: "/recipes/mine" },
    { name: "Get All Recipes",      url: "/recipes" },
    { name: "Search (no keyword)",  url: "/recipes/search" },
    { name: "Filter (no category)", url: "/recipes/filter" },
    { name: "Get by ID (fake)",     url: "/recipes/123456789012345678901234" },
];

let passed = 0;
let failed = 0;
const results = [];

function runTest(test, callback) {
    const options = {
        hostname: "localhost",
        port: 3000,
        path: test.url,
        method: "GET",
    };

    const req = http.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => { data += chunk; });
        res.on("end", () => {
            try {
                const body = JSON.parse(data);
                const status = res.statusCode;
                const isExpectedFail = (test.name.includes("no token") && status === 401) ||
                                       (test.name.includes("no keyword") && status === 400) ||
                                       (test.name.includes("no category") && status === 400) ||
                                       (test.name.includes("fake") && (status === 404 || status === 500));
                const pass = status < 500 || isExpectedFail;
                if (pass) passed++; else failed++;
                results.push({ test: test.name, status, message: body.message || "OK", result: pass ? "PASS" : "FAIL" });
            } catch (e) {
                failed++;
                results.push({ test: test.name, status: res.statusCode, message: "Parse error", result: "FAIL" });
            }
            callback();
        });
    });

    req.on("error", (e) => {
        failed++;
        results.push({ test: test.name, status: 0, message: e.message, result: "FAIL" });
        callback();
    });

    req.setTimeout(5000, () => {
        req.destroy();
        failed++;
        results.push({ test: test.name, status: 0, message: "TIMEOUT", result: "FAIL" });
        callback();
    });

    req.end();
}

function runAll(index) {
    if (index >= tests.length) {
        console.log("\n===== TEST RESULTS =====");
        results.forEach(r => {
            console.log(`[${r.result}] ${r.test} | Status: ${r.status} | Msg: ${r.message}`);
        });
        console.log(`\nTotal: ${tests.length} | PASSED: ${passed} | FAILED: ${failed}`);
        process.exit(failed > 0 ? 1 : 0);
        return;
    }
    runTest(tests[index], () => runAll(index + 1));
}

runAll(0);
