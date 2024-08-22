import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { text, scheduledFor, tags = [], isUsed = false } = await req.json();

        if (!text) {
            return new Response(JSON.stringify({ error: 'Text is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Check if a quote with the same text already exists using findFirst
        const existingQuote = await prisma.quote.findFirst({
            where: { text },
        });

        if (existingQuote) {
            return new Response(JSON.stringify({ error: 'Quote already exists' }), {
                status: 409,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Handle tags: create if they don't exist, but only for non-empty strings
        let tagConnections = [];
        if (Array.isArray(tags) && tags.length > 0) {
            const filteredTags = tags.map(tag => tag.trim()).filter(tag => tag.length > 0); // Ensure tags are non-empty strings

            for (const tagName of filteredTags) {
                let tag = await prisma.tag.findUnique({ where: { name: tagName } });
                if (!tag) {
                    tag = await prisma.tag.create({ data: { name: tagName } });
                }
                tagConnections.push({ id: tag.id });
            }
        }

        const newQuote = await prisma.quote.create({
            data: {
                text,
                scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
                isUsed,
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
        console.error('Error creating quote:', error.message);
        return new Response(JSON.stringify({ error: 'Failed to create quote', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
