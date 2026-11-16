// /app/pokemon/[id]/page.jsx
import FUllPokemon from "@/components/FullPokemon"
import pool from '@/lib/db'

export default async function PokemonPage({ params }) {
    let parameters = await params
    let id = parameters.id
    const [rows] = await pool.query('SELECT * FROM pokemon WHERE id = ?', [id])
    console.log(rows)
    // Pegar as informações deste pokemon
    // e montar uma página completa
    // https://pokemon.danielpimentel.com.br/v1/pokemon/numero/15
    
    return (
        <div>
            ID: {id}<br />
            NOME: {rows[0].nome}
            <FUllPokemon numero={id} />
        </div>
    )
}