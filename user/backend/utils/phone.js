const { parsePhoneNumberFromString } = require("libphonenumber-js");

// "+254 712 345 678" becomes "+254712345678", or null if the number is invalid
exports.normalizePhone = (input) => {
  const p = parsePhoneNumberFromString(String(input || ""));
  return p && p.isValid() ? p.number : null;
};

// "+254712345678" becomes "+254 7•• ••• 678"
exports.maskPhone = (e164) => {
  const p = parsePhoneNumberFromString(String(e164 || ""));
  if (!p) return null;
  const n = p.nationalNumber;
  return `+${p.countryCallingCode} ${n[0]}•• ••• ${n.slice(-3)}`;
};