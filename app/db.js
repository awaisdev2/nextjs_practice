import mysql from 'mysql'

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nextjs_practice'
})

db.connect((err) => {
    if (err) throw err
    console.log('Connected to MySQL')
})

export default db