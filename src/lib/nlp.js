// Lightweight intent parser focused on shopping list commands.
// Supported intents: add_item, remove_item, set_quantity, search_item, clear_list, unknown
const NUMBER_WORDS = {
  'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7,
  'eight': 8, 'nine': 9, 'ten': 10, 'ek': 1, 'do': 2, 'teen': 3, 'char': 4, 'paanch':5, 'chhe':6, 'saat':7, 'aath':8, 'nau':9, 'dus':10
};
function wordToNumber(word) {
  const n = NUMBER_WORDS[word?.toLowerCase()];
  return n || null;
}
function findNumber(text) {
  const m = text.match(/(\d+(?:\.\d+)?)|\b(one|two|three|four|five|six|seven|eight|nine|ten|ek|do|teen|char|paanch|chhe|saat|aath|nau|dus)\b/i);
  if (!m) return null;
  if (m[1]) return parseFloat(m[1]);
  if (m[2]) return wordToNumber(m[2]);
  return null;
}
function normalize(text) {
  return text.toLowerCase().trim();
}
export function parseCommand(inputRaw) {
  const input = normalize(inputRaw);
  // Clear list
  if (/\b(clear|empty)\b.*\blist\b/.test(input)) {
    return { intent: 'clear_list' };
  }
  // Remove item
  if (/\b(remove|delete|cut)\b/.test(input)) {
    const item = input.replace(/.*\b(remove|delete|cut)\b/, '').replace(/^\s*(from\s+my\s+list)?\s*/,'').trim();
    return { intent: 'remove_item', item: item || null };
  }
  // Search items
  if (/(^find\b|\bsearch\b)/.test(input) || /\bshow me\b/.test(input)) {
    const underMatch = input.match(/under\s*(?:rs|₹|inr|\$)?\s*(\d+(?:\.\d+)?)/i);
    const brandMatch = input.match(/\bbrand\s+([a-z0-9\-\s]+)/i);
    const organic = /\borganic\b/.test(input);
    let q = input.replace(/(^find|search|show me)/,'').replace(/under.*$/,'').trim();
    q = q.replace(/\bbrand\s+[a-z0-9\-\s]+/i,'').trim();
    return { intent: 'search_item', query: q, under: underMatch ? parseFloat(underMatch[1]) : null, brand: brandMatch ? brandMatch[1].trim() : null, organic };
  }
  // Quantity setting like "add 2 bottles of water" / "add 5 oranges"
  if (/(^add\b|\bbuy\b|\bget\b|\bneed\b|\bi need\b|\bi want to buy\b)/.test(input)) {
    // Remove leading action words
    let rest = input.replace(/^(add|buy|get|need|i need|i want to buy)\b\s*/,'').trim();
    const qty = findNumber(rest);
    if (qty != null) {
      // remove the number and possible unit word
      rest = rest.replace(/(\d+(?:\.\d+)?|one|two|three|four|five|six|seven|eight|nine|ten|ek|do|teen|char|paanch|chhe|saat|aath|nau|dus)\s*(bottles?|packs?|kg|g|lit(er)?s?|l|pieces?|pcs?)?/,'').trim();
    }
    const ofless = rest.replace(/^of\s+/,'').trim(); // "of water" -> "water"
    return { intent: 'add_item', item: ofless, quantity: qty || 1 };
  }
  // Adjust quantity like "set 3 apples" or "make apples 3"
  if (/\b(set|make)\b/.test(input) && /\b\d+\b/.test(input)) {
    const qty = findNumber(input);
    const item = input.replace(/\b(set|make)\b/,'').replace(/\bto\b\s*\d+/,'').replace(/\d+/,'').trim();
    return { intent: 'set_quantity', item, quantity: qty };
  }
  return { intent: 'unknown', raw: inputRaw };
}
