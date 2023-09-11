const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "./cypress/cucumber-json/",
    reportPath: "./cypress/cucumber-report/",
    metadata: {
        browser: {
            name: "chrome",
            version: "116",
        },
        device: "Local test machine",
        platform: {
            name: "mac",
            version: "13.3.1",
        },
    },
    customData: {
        title: "Run info",
        data: [
            { label: "Project", value: "Test Zubair project" },
            { label: "Release", value: "1.2.1" },
            { label: "Cycle", value: "Test12" },
            { label: "Execution Start Time", value: "Sep 11th 2017, 02:31 PM EST" },
            { label: "Execution End Time", value: "Sep 11th 2017, 02:56 PM EST" },
        ],
    },
});