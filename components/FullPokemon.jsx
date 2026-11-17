import Link from 'next/link'

export default function FullPokemon({ pokemon }) {
    const atributos = [
        ['Número', pokemon.numero],
        ['Tipo', pokemon.tipo],
        ['Geração', pokemon.geracao],
        ['Altura', `${pokemon.altura} cm`],
        ['Peso', `${pokemon.peso} g`],
        ['HP', pokemon.hp],
        ['Ataque', pokemon.atk],
        ['Defesa', pokemon.def],
        ['Ataque especial', pokemon.spatk],
        ['Defesa especial', pokemon.spdef],
        ['Velocidade', pokemon.speed],
        ['Evoluções', pokemon.evolucoes || 'Não informado'],
    ]

    return (
        <main className="max-w-3xl mx-auto p-6">
            <Link href="/" className="text-sky-600 font-semibold">Voltar para a lista</Link>

            <section className="mt-6 border border-sky-800 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    {pokemon.img && <img className="w-52 h-52 object-contain" src={pokemon.img} alt={pokemon.nome} />}
                    <div>
                        <h1 className="text-3xl font-bold capitalize">{pokemon.nome}</h1>
                        <p className="mt-2">Pokémon #{pokemon.numero}</p>
                        <p className="mt-2 font-semibold">{pokemon.favorito ? '★ Favorito' : 'Não favorito'}</p>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-3">Informações</h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {atributos.map(([nome, valor]) => (
                        <div key={nome} className="bg-slate-100 rounded p-3">
                            <dt className="text-sm text-slate-600">{nome}</dt>
                            <dd className="font-semibold capitalize">{valor}</dd>
                        </div>
                    ))}
                </dl>

                <h2 className="text-xl font-semibold mt-8 mb-3">Imagens</h2>
                <div className="flex flex-wrap gap-4">
                    {pokemon.img_3d && <img className="w-36 h-36 object-contain" src={pokemon.img_3d} alt={`${pokemon.nome} 3D`} />}
                    {pokemon.img_shiny && <img className="w-36 h-36 object-contain" src={pokemon.img_shiny} alt={`${pokemon.nome} shiny`} />}
                </div>
            </section>
        </main>
    )
}
