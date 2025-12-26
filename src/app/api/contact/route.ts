import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Forward the request to n8n from the server side (No CORS issues!)
        // Note: Using the URL provided by the user in the Frontend, or we can hardcode it here.
        // For simplicity, we'll accept the n8n_url in the body OR hardcode it.
        // Let's hardcode the user's localhost URL for now, or better yet, move it here.
        // switching to Production URL (removed '-test')
        const N8N_URL = "http://localhost:5678/webhook/contact-form";

        const response = await fetch(N8N_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`n8n responded with ${response.status}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json({ error: 'Failed to forward message' }, { status: 500 });
    }
}
