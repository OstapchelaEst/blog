export function sendError(res, error) {
  res.status(500).json({ message: error.message });
}
