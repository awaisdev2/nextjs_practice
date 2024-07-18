import db from "@/app/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const results = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM Todos', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        })
        console.log('results: ', results);
        return NextResponse.json({data: results});
    } catch (error) {
        console.error('Error fetching data: ', error);
        return NextResponse.json({ error: error.message });
    }
}

export async function POST(req) {
    try {
        const data = await req.json();
        const result = await new Promise((resolve, reject) => {
            db.query('INSERT INTO Todos SET?', data, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        console.log('result: ', result);
        return NextResponse.json({data: result});
    } catch (error) {
        console.error('Error saving data: ', error);
        return NextResponse.json({ error: error.message });
    }
}