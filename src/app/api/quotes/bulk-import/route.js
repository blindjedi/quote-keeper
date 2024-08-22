import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { quotes } = await req.json();

    if (!quotes || quotes.length === 0) {
      return new Response(JSON.stringify({ error: 'No quotes provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let updatedCount = 0;
    let skippedCount = 0;

    for (const quoteData of quotes) {
      const { quote, scheduledFor, tags, isUsed } = quoteData;

      if (!quote) {
        console.error('Skipping a row without text:', quoteData);
        continue; // Skip this iteration if quote is missing
      }

      // Use `findFirst` to check if the quote already exists
      const existingQuote = await prisma.quote.findFirst({
        where: { text: quote },
      });

      if (existingQuote) {
        console.log('Skipping duplicate quote:', quote);
        skippedCount++;
        continue; // Skip if the quote already exists
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
          scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
          isUsed: isUsed.toLowerCase() === 'true', // Convert 'True'/'False' to boolean true/false
          tags: {
            connect: tagConnections,
          },
        },
      });

      updatedCount++;
    }

    return new Response(JSON.stringify({ updatedQuotes: updatedCount, skippedDuplicates: skippedCount }), {
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
