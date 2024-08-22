import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { quotes } = await req.json(); // Receive JSON data

    if (!quotes || quotes.length === 0) {
      return new Response(JSON.stringify({ error: 'No quotes provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let updatedCount = 0;

    for (const quoteData of quotes) {
      const { quote, isUsed, tags } = quoteData; // columns in csv file (quote, isUsed)

      if (!quote) {
        console.error('Skipping a row without text:', quoteData);
        continue; // Skip this iteration if quote is missing
      }

      let tagConnections = [];
      if (tags && tags.length > 0) {
        const tagList = tags.split(',').map(tag => tag.trim());
        for (const tagName of tagList) {
          let tag = await prisma.tag.findUnique({ where: { name: tagName } });
          if (!tag) {
            tag = await prisma.tag.create({ data: { name: tagName } });
          }
          tagConnections.push({ id: tag.id });
        }
      }

      await prisma.quote.create({
        data: {
          text: quote, // Use the `quote` field for `text`
          isUsed: isUsed.toLowerCase() === 'true', // Convert 'true'/'false' string to boolean
          tags: {
            connect: tagConnections,
          },
        },
      });

      updatedCount++;
    }

    return new Response(JSON.stringify({ updatedQuotes: updatedCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Bulk import failed:', error);
    return new Response(JSON.stringify({ error: 'Bulk import failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
