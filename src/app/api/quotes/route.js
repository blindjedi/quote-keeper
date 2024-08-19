import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const quotes = await prisma.quote.findMany();
    return new Response(JSON.stringify(quotes), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch quotes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { text, scheduledFor, tags } = body;
    const newQuote = await prisma.quote.create({
      data: {
        text,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        tags: {
          connect: tags.map(tagId => ({ id: tagId })),
        },
      },
    });
    return new Response(JSON.stringify(newQuote), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create quote' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
