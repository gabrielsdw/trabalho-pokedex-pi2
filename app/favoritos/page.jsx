import Link from 'next/link'
import pool from '@/lib/db'

export default async function FavoritosPage() {
  const [pokemons] = await pool.query('SELECT * FROM pokemon WHERE favorito = 1 ORDER BY numero')

  return (
    <main className="p-6">
      <nav className="bg-sky-500 text-white flex gap-4 py-2 px-6 -mx-6 -mt-6 mb-6">
        <Link href="/">Início</Link>
        <Link href="/sobre">Sobre</Link>
      </nav>

      <h1 className="text-3xl font-bold mb-6">Pokémon favoritos</h1>

      {pokemons.length === 0 ? (
        <p>Nenhum Pokémon foi favoritado ainda.</p>
      ) : (
        <div className="flex gap-4 flex-wrap">
          {pokemons.map((pokemon) => (
            <Link key={pokemon.numero} href={`/pokemon/${pokemon.numero}`} className="border border-sky-800 rounded-xl p-5 w-52">
              {pokemon.img && <img className="w-full h-40 object-contain" src={pokemon.img} alt={pokemon.nome} />}
              <h2 className="text-center capitalize font-semibold mt-2">{pokemon.nome}</h2>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
