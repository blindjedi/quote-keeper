import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
  const { id } = params;
  const { text, isUsed } = await req.json();

  try {
    const updatedQuote = await prisma.quote.update({
      where: { id },
      data: { text, isUsed },
    });

    return new Response(JSON.stringify(updatedQuote), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating quote:', error);
    return new Response(JSON.stringify({ error: 'Failed to update quote' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
