import fs from "node:fs";
import path from "node:path";
import express from "express";

const app = express();
const port = Number(process.env.PORT || 5000);
const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  const distPath = path.resolve("dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  const vite = await import("vite").then(({ createServer }) =>
    createServer({
      server: { middlewareMode: true },
      appType: "custom"
    })
  );

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    try {
      const template = fs.readFileSync(path.resolve("index.html"), "utf8");
      const html = await vite.transformIndexHtml(req.originalUrl, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      vite.ssrFixStacktrace(error);
      next(error);
    }
  });
}

app.listen(port, () => {
  console.log(`HPC Learning Studio listening on http://localhost:${port}`);
});
