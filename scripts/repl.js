const { PrismaClient } = require('@prisma/client'); // Import the Prisma Client
const repl = require('repl'); // Import Node.js's REPL module

const prisma = new PrismaClient(); // Initialize Prisma Client

const server = repl.start('> '); // Start the REPL, with the prompt set to '> '

// Make `prisma` accessible in the REPL
server.context.prisma = prisma;

console.log('Prisma Client is loaded into the REPL as `prisma`.');
