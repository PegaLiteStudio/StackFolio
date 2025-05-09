// server/vite.ts
import express, {type Express} from "express";
import fs from "fs";
import path from "path";
import {type Server} from "http";
import {nanoid} from "nanoid";
import {fileURLToPath} from "url"; // ← add this

// ── recreate __dirname in ESM ─────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ───────────────────────────────────────────────────────────────────────────────

export function log(message: string, source = "express") {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
    });
    console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
    app.use("*", async (req, res, next) => {
        try {
            const clientTemplate = path.resolve(
                __dirname,              // ← was import.meta.dirname
                "..", "client", "index.html",
            );
            let template = await fs.promises.readFile(clientTemplate, "utf-8");
            template = template.replace(
                `src="/src/main.tsx"`,
                `src="/src/main.tsx?v=${nanoid()}"`,
            );
            // …
        } catch (e) { /* … */
        }
    });
}

export function serveStatic(app: Express) {
    const distPath = path.resolve(
        __dirname,                  // ← was import.meta.dirname
        "public"
    );

    if (!fs.existsSync(distPath)) {
        throw new Error(`Could not find the build directory: ${distPath}`);
    }

    app.use(express.static(distPath));
    app.use("*", (_req, res) => {
        res.sendFile(path.resolve(distPath, "index.html"));
    });
}
