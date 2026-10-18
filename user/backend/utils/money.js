// All money maths in whole cents. Never use decimals (floats) for prices.
const toCents = (v) => {
  const s = String(v).trim();
  if (!/^\d+(\.\d{1,2})?$/.test(s)) throw new Error(`Invalid money value: ${s}`);
  const [whole, frac = ""] = s.split(".");
  return Number(whole) * 100 + Number((frac + "00").slice(0, 2));
};

const fromCents = (c) => `${Math.floor(c / 100)}.${String(c % 100).padStart(2, "0")}`;

// Builds { kes: "57.00", aud: "0.63" }. rate = KES per 1 AUD (e.g. 90.30)
const money = (kesCents, rate) => ({
  kes: fromCents(kesCents),
  aud: fromCents(Math.round(kesCents / Number(rate))),
});

module.exports = { toCents, fromCents, money };