import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 5500);
const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".pdf", "application/pdf"],
  [".hwp", "application/x-hwp"],
  [".hwpx", "application/vnd.hancom.hwpx"],
  [".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml"]
]);

function resolveRequestPath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const requested = decoded === "/" ? "/index.html" : decoded;
  const absolute = path.resolve(root, `.${requested}`);
  return absolute === root || absolute.startsWith(`${root}${path.sep}`) ? absolute : null;
}

const server = http.createServer((req, res) => {
  const filePath = resolveRequestPath(req.url || "/");
  if (!filePath) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Forbidden");
  }

  fs.stat(filePath, (error, stat) => {
    if (error || !stat.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("Not found");
    }

    const ext = path.extname(filePath).toLowerCase();
    const headers = {
      "Content-Type": mime.get(ext) || "application/octet-stream",
      "Content-Length": stat.size,
      "Cache-Control": "no-cache"
    };
    if ([".hwp", ".hwpx", ".docx"].includes(ext)) {
      headers["Content-Disposition"] = `attachment; filename*=UTF-8''${encodeURIComponent(path.basename(filePath))}`;
    }
    res.writeHead(200, headers);
    if (req.method === "HEAD") return res.end();
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`소방특사경 대시보드: http://localhost:${port}`);
  console.log("종료: Ctrl+C");
});
