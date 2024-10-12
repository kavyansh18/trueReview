import { NextResponse } from 'next/server';

const geminiApiKey = process.env.GEMINI_API_KEY;

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // Sending the request to Gemini's API
    const response = await fetch('https://generativelanguage.googleapis.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${geminiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gemini-1.5-flash',
        prompt,
        max_tokens: 400,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      return NextResponse.json({ error: 'Failed to fetch response from Gemini API', details: errorDetails }, { status: response.status });
    }

    const stream = response.body;

    if (!stream) {
      return NextResponse.json({ error: 'Failed to retrieve streaming data' }, { status: 500 });
    }

    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let result = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }

    return new NextResponse(result, { status: 200 });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}
