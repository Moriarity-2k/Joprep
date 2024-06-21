import Cors from 'cors';
import { NextRequest, NextResponse } from 'next/server';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
  origin: 'https://joprep-olive.vercel.app', // your allowed origin
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req: NextRequest, res: NextResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export { cors, runMiddleware };
