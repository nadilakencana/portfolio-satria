const fs = require("fs");
const path = require("path");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY || "re_dev_placeholder");

async function sendCvEmail(name, email) {
  const cvPath = path.join(process.cwd(), "public", "cv", "Satria_Bagaskara_CV.pdf");
  const cvBuffer = fs.readFileSync(cvPath);
  const attachments = [{ filename: "Satria_Bagaskara_CV.pdf", content: cvBuffer.toString("base64") }];

  const html = `
    <div style="font-family: Segoe UI, sans-serif; max-width: 560px; margin: 0 auto; color: #333; line-height: 1.7;">
      <p>Dear ${escapeHtml(name)},</p>
      <p>Dengan hormat,</p>
      <p>Saya Satria Bagaskara, lulusan S1 Teknik Informatika dengan pengalaman profesional di bidang IT Support, IT QA Manual &amp; Writter dan IT Application Support.</p>
      <p>Saat ini saya berperan sebagai IT Application Support yang menangani lebih dari 500 fasilitas kesehatan, dengan tanggung jawab mencakup analisis kebutuhan sistem, implementasi aplikasi, monitoring sistem berbasis cloud (GCP), serta koordinasi dengan berbagai stakeholder termasuk tim teknis, user, dan regulator.</p>
      <p>Selain itu, saya juga memiliki pengalaman dalam penyusunan laporan operasional dan analisis permasalahan sistem yang digunakan sebagai dasar pengambilan keputusan. Untuk mendukung kemampuan tersebut, saya telah mengikuti Data Analysis Fullstack Intensive Bootcamp yang mencakup SQL, Python, data cleansing, dan visualisasi data.</p>
      <p>Dengan kombinasi pengalaman IT operasional dan kemampuan analisis data yang saya miliki, saya percaya dapat memberikan kontribusi yang baik dalam pengelolaan sistem, peningkatan efisiensi proses, serta pengolahan data untuk kebutuhan bisnis.</p>
      <p>Berikut ini saya lampirkan Curriculum Vitae yang sudah bapak/ibu request pada web portofolio saya. Saya sangat terbuka untuk kesempatan karir ataupun peluang lainnya yang bapak/ibu butuhkan dari keahlian saya.</p>
      <p>Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.</p>
      <p style="margin-top: 24px;">
        Hormat saya,<br/>
        <strong>(SATRIA BAGASKARA)</strong><br/>
        Telp : 089509253782<br/>
        Email : satria.bagaskara.05@gmail.com<br/>
        Linkedin : linkedin.com/in/satria-bagaskara
      </p>
    </div>
  `;

  return resend.emails.send({
    from: `Satria Bagaskara <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
    to: email,
    replyTo: process.env.OWNER_EMAIL,
    subject: "Feedback CV Satria Bagaskara",
    html,
    attachments,
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

module.exports = { sendCvEmail };
