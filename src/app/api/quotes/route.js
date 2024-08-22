import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get('filter') || 'all';

    let whereClause = {};
    if (filter === 'used') {
      whereClause = { isUsed: true };
    } else if (filter === 'unused') {
      whereClause = { isUsed: false };
    }

    const quotes = await prisma.quote.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

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
