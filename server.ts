import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase the payload limit to allow large SVG base64 strings
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.fastmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || "it@it.ecohash.com",
      pass: process.env.SMTP_PASS || "5j366x677w8v7c8k",
    },
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/send-email", async (req, res) => {
    try {
      const { name, to_emails, front_attachment, back_attachment } = req.body;

      // Extract the base64 part
      const frontData = front_attachment.split("base64,")[1];
      const backData = back_attachment.split("base64,")[1];

      for (const email of to_emails) {
        // Send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"名片制作系统" <it@it.ecohash.com>', // sender address
          to: email, // list of receivers
          subject: `Cango 名片印制需求 - ${name}`, // Subject line
          text: `【${name}】发起了名片制作需求，请下载附件文档进行印制。`, // plain text body
          html: `<p><b>【${name}】</b> 发起了名片制作需求，请下载附件 SVG 文档进行印制。</p>`, // html body
          attachments: [
            {
              filename: `${name}_front.svg`,
              content: frontData,
              encoding: "base64",
            },
            {
              filename: `${name}_back.svg`,
              content: backData,
              encoding: "base64",
            },
          ],
        });
        console.log("Message sent to %s: %s", email, info.messageId);
      }

      res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: String(error) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Note: express hasn't been configured properly to serve static assets from the current directory, it needs to point to 'dist'
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
