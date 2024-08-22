
## Prisma Repl

### Start
- start repl
  - `node scripts/repl.js`
- clear screen
  - `cmd + k`


```javascript
const quotes = await prisma.quote.findMany();
const numberOfQuotes = quotes.length;
console.log(`Number of quotes: ${numberOfQuotes}`);

// delete all quotes
await prisma.quote.deleteMany({});

```