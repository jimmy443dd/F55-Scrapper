/**
 * Validate and extract emails using regex.
 * @param {string} text - The text content of a webpage.
 * @returns {string[]} - Array of unique email addresses.
 */
function validateAndExtractEmails(text) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const emails = text.match(emailRegex) || [];
  return [...new Set(emails)]; // Deduplicate emails
}

module.exports = { validateAndExtractEmails };
