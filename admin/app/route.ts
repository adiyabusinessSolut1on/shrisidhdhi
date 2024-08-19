import { NextRequest, NextResponse } from 'next/server';
import httpProxy from 'http-proxy';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const proxy = httpProxy.createProxyServer();

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};

export async function GET(req: NextRequest) {
    return handleProxy(req);
}

export async function POST(req: NextRequest) {
    return handleProxy(req);
}

export async function PUT(req: NextRequest) {
    return handleProxy(req);
}

export async function DELETE(req: NextRequest) {
    return handleProxy(req);
}

async function handleProxy(req: NextRequest) {
    return new Promise((resolve, reject) => {
        proxy.web(req as any, {} as any, { target: API_URL, changeOrigin: true }, (err) => {
            if (err) {
                reject(new Response(JSON.stringify({ error: 'Proxy error', details: err.message }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                }));
            }
        });
    });
}
