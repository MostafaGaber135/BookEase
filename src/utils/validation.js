export function isValidEmail(email) {
  const v = String(email || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function passwordRules(password) {
  const p = String(password || "");
  return {
    minLength: p.length >= 8,
    hasLower: /[a-z]/.test(p),
    hasUpper: /[A-Z]/.test(p),
    hasNumber: /\d/.test(p),
    hasSymbol: /[^A-Za-z0-9]/.test(p),
  };
}

export function passwordRulesMessage(rules) {
  const missing = [];
  if (!rules.minLength) missing.push("8+ chars");
  if (!rules.hasLower) missing.push("lowercase");
  if (!rules.hasUpper) missing.push("uppercase");
  if (!rules.hasNumber) missing.push("number");
  if (!rules.hasSymbol) missing.push("symbol");
  return missing.length
    ? `Password must include: ${missing.join(", ")}.`
    : "";
}
