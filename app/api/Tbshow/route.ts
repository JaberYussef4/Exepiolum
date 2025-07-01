import { promises as fs } from 'fs';
import path from 'path';

// Path to your db.json
const dbPath = path.join(process.cwd(), 'app/api/db.json');

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    // Read current database
    const dbContents = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(dbContents);
    
    // Add new item to tbtest array
    db.tbtest.push(text);
    
    // Write back to database
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
    
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dbContents = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(dbContents);
    return Response.json(db.tbtest || []);
  } catch (error) {
    return Response.json([], { status: 200 });
  }
}