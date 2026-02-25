// const PDFDocument = require("pdfkit");
// const fs = require("fs");
import PDFDocument from "pdfkit";
import fs from "fs";


const sampleContent = `Altimetrik has been on a tremendous journey and you have been an integral part of it! Your dedication and
contribution to the business is truly appreciated.
In just the last one year, you have participated and witnessed one of the most remarkable growth stories for a
young technology company globally. Over last few years, we added several new logos and exciting projects, and
added hundreds of new members across all our locations. Even with the pandemic crisis this year we have
managed to stay afloat. We shared our moment of pride when we made it to the 48th Great Places to Work rank
this year.
Our people are at the center of everything we do. We are confident that with your dedication and commitment,
we will experience more growth in the future for the company and for every individual.
On that note, we are pleased to inform you that your annual compensation has been revised from INR 990,000.00
to INR 1,098,996.00 with effect from 25-Mar-2021.
The details of your revised annual compensation are presented in the attachment Annexure A.
All other terms and conditions remain unchanged.
Please keep the details of your compensation confidential.
We take this opportunity to thank your family for supporting you to deliver your best at Altimetrik. We look forward to your continued contribution and wish you all the best for your future endeavors at Altimetrik.
Warm Regards,
Altimetrik HR Team;`

process.on("message", (data) => {
  const { filePath, content } = data;

  const doc = new PDFDocument();
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);
  doc.text(sampleContent);
  doc.end();

  stream.on("finish", () => {
    process.send({ status: "done" });
  });
});