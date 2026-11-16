export default function CardPokemon({ pokemon, favorito = false, onFavorite, onRemove, onSelected }) {


    return(
        <div className="border-gray-100 border rounded-xl border-sky-800 p-5 ">
            <img 
                className="w-48 h-48 object-contain"
                src={pokemon.img}
                alt={pokemon.nome}
                onClick={() => onSelected(pokemon.numero)}
            />
            <h2 
                className="text-center capitalize font-semibold mt-1.5"
                onClick={() => onSelected(pokemon.numero)}
            >
                {pokemon.nome}
            </h2>

            <div className="text-xs mt-2 flex justify-between">
                <span>Altura: </span>
                <span className="font-semibold">{pokemon.altura}cm</span>
                <span>Peso: </span>
                <span className="font-semibold">{pokemon.peso}kg</span>
            </div>
            {onFavorite && (
                <button
                    className="bg-yellow-400 text-slate-900 py-1 px-2 rounded-2xl mt-4 cursor-pointer"
                    onClick={() => onFavorite(pokemon.numero, !favorito)}
                >
                    {favorito ? 'Desfavoritar' : 'Favoritar'}
                </button>
            )}

            {onRemove && (
                <button className="bg-red-600 text-white py-1 px-2 rounded-2xl mt-4 ml-2 cursor-pointer" onClick={() => onRemove(pokemon.numero)}>
                    Remover
                </button>
            )}
            
        </div>

        
    )
}
