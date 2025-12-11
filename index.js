const express = require('express');
const path = require('path');
const fs = require('fs');
const { validateAndExtractEmails } = require('./helpers');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to extract emails
app.post('/extract-emails', express.json(), (req, res) => {
  const { url, pageContent } = req.body;

  if (!url || !pageContent) {
    return res.status(400).json({ error: 'URL and page content are required.' });
  }

  const emails = validateAndExtractEmails(pageContent);

  if (emails.length > 0) {
    // Save emails to a CSV file
    const filePath = path.join(__dirname, 'emails.csv');
    const csvData = 'Email\n' + emails.join('\n');
    fs.writeFileSync(filePath, csvData, 'utf8');

    return res.status(200).json({
      message: `${emails.length} emails found.`,
      emails,
      downloadLink: '/emails.csv',
    });
  } else {
    return res.status(200).json({ message: 'No emails found.', emails: [] });
  }
});

// Endpoint for CSV download
app.get('/emails.csv', (req, res) => {
  const filePath = path.join(__dirname, 'emails.csv');
  res.download(filePath, 'emails.csv');
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
