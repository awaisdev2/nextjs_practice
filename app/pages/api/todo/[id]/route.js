import db from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    try {
        const result = db.query('SELECT * FROM Todos WHERE id = ?', [
            params.id,
        ]);
        return NextResponse.json({data: result[0]});
    } catch (error) {
        console.error('Error fetching user: ', error);
        return NextResponse.json({ error: error.message });
    }
}


export async function DELETE(req, {params}) {
    try {
        const result = db.query('DELETE FROM Todos WHERE id =?', [
            params.id,
        ]);
        return NextResponse.json({data: result});
    } catch (error) {
        console.error('Error deleting user: ', error);
        return NextResponse.json({ error: error.message });
    }
}

export async function PUT(req, { params }) {
    try {
      const body = await req.json();
      const { id } = params;
      
      const result = db.query('UPDATE todos SET ? WHERE id = ?', [body, id]);
      return NextResponse.json({ data: result });
    } catch (error) {
      console.error('Error updating todo:', error);
      return NextResponse.json({ error: error.message });
    }
  }