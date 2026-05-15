import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: any, res: any) {
  // 处理 CORS 预检请求 (如果需要)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, to_emails, front_attachment, back_attachment } = req.body;

    // Extract the base64 part
    const frontData = front_attachment.split("base64,")[1];
    const backData = back_attachment.split("base64,")[1];

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

    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ success: false, error: String(error) });
  }
}
