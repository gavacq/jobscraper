export default function handler(req: any, res: any) {
  if (req.method === 'GET') {
    res.status(200).json({ name: 'John Doe' })
  }
  else {
    console.log('not a GET');
  }
}

