import pool from '@/lib/db'

export async function GET() {
  const [rows] = await pool.query('SELECT numero FROM pokemon WHERE favorito = 1')
  return Response.json({ numeros: rows.map((pokemon) => pokemon.numero) })
}

export async function POST(request) {
  const { numero, favorito } = await request.json()
  const numeroPokemon = Number(numero)

  if (!Number.isInteger(numeroPokemon) || numeroPokemon < 1) {
    return Response.json({ erro: 'Número de Pokémon inválido.' }, { status: 400 })
  }

  const [resultado] = await pool.query(
    'UPDATE pokemon SET favorito = ?, updated_at = CURRENT_TIMESTAMP WHERE numero = ?',
    [favorito ? 1 : 0, numeroPokemon]
  )

  if (resultado.affectedRows === 0) {
    return Response.json({ erro: 'Pokémon não encontrado.' }, { status: 404 })
  }

  return Response.json({ numero: numeroPokemon, favorito: Boolean(favorito) })
}
