export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { name, email, phone, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Placeholder: log to server for now. Integrate email or DB later.
    console.log("Get Started submission:", { name, email, phone, message });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}


