import FullPokemon from "@/components/FullPokemon"
import pool from '@/lib/db'
import { notFound } from 'next/navigation'

export default async function PokemonPage({ params }) {
    const { id } = await params
    const numero = Number(id)

    if (!Number.isInteger(numero) || numero < 1) notFound()

    const [rows] = await pool.query('SELECT * FROM pokemon WHERE numero = ?', [numero])

    if (!rows[0]) notFound()

    return (
        <FullPokemon pokemon={rows[0]} />
    )
}
