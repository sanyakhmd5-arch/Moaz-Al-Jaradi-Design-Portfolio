const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

const file = "./visitors.json";

// Ensure the file exists
if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify({ count: 0 }));
}

app.get("/visit", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(file, "utf8"));
        data.count += 1;
        fs.writeFileSync(file, JSON.stringify(data));
        res.json({ count: data.count });
    } catch (error) {
        console.error("Error handling visitor count:", error);
        res.status(500).json({ error: "Failed to update visitor count" });
    }
});

app.get("/count", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(file, "utf8"));
        res.json({ count: data.count });
    } catch (error) {
        console.error("Error getting visitor count:", error);
        res.status(500).json({ error: "Failed to get visitor count" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Visitor counter running on port ${PORT}...`);
});