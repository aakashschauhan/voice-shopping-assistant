const MAP = [
  { cat: 'Dairy', keys: ['milk', 'cheese', 'yogurt', 'butter', 'paneer', 'curd', 'ghee'] },
  { cat: 'Produce', keys: ['apple', 'banana', 'orange', 'tomato', 'potato', 'onion', 'mango', 'spinach', 'carrot', 'ginger', 'garlic'] },
  { cat: 'Bakery', keys: ['bread', 'bun', 'cake'] },
  { cat: 'Grains & Cereals', keys: ['rice', 'wheat', 'oats', 'flour', 'atta', 'daliya'] },
  { cat: 'Snacks', keys: ['chips', 'biscuits', 'cookies', 'namkeen'] },
  { cat: 'Beverages', keys: ['water', 'juice', 'soda', 'tea', 'coffee'] },
  { cat: 'Personal Care', keys: ['toothpaste', 'soap', 'shampoo', 'toothbrush'] },
  { cat: 'Household', keys: ['detergent', 'dishwash', 'cleaner'] },
];
export function categorize(name) {
  const n = (name||'').toLowerCase();
  for (const {cat, keys} of MAP) {
    if (keys.some(k => n.includes(k))) return cat;
  }
  return 'Other';
}
