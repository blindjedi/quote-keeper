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

    if (!text) {
      throw new Error('Text is required');
    }

    // Handle tags: create if they don't exist
    let tagConnections = [];
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        let tag = await prisma.tag.findUnique({ where: { name: tagName } });
        if (!tag) {
          // If the tag doesn't exist, create it
          tag = await prisma.tag.create({ data: { name: tagName } });
        }
        tagConnections.push({ id: tag.id });
      }
    }

    const newQuote = await prisma.quote.create({
      data: {
        text,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        tags: {
          connect: tagConnections,
        },
      },
    });

    return new Response(JSON.stringify(newQuote), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating quote:', error);
    return new Response(JSON.stringify({ error: 'Failed to create quote', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
