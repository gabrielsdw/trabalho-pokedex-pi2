'use client'
import CardPokemon from "@/components/CardPokemon";
import { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from "next/navigation";


export default function Home() {
  let [regiao, setRegiao] = useState(1)
  let [regioes, setRegioes] = useState([])

  let [pokemons, setPokemons] = useState([])
  let [favoritos, setFavoritos] = useState([])

  // Irá gerenciar as nossas rotas
  let router = useRouter()

  // executa uma unica vez durante a amontagem do componente
  useEffect(()=>{
    async function getRegioes(){
      let resposta = await fetch ("https://pokemon.danielpimentel.com.br/v1/regioes")
      let dados = await resposta.json()
      console.log(dados)
      setRegioes(dados.regioes)
    }
    getRegioes()
  },[])

  useEffect(() => {
    async function getFavoritos() {
      try {
        const resposta = await fetch('/api/favoritos')
        if (!resposta.ok) return

        const dados = await resposta.json()
        setFavoritos(dados.numeros)
      } catch (erro) {
        console.error('Não foi possível carregar os favoritos', erro)
      }
    }

    getFavoritos()
  }, [])

  // chama toda vez que variavel região é alterada
  useEffect(()=>{
    async function getPokemons(){
      let resposta = await fetch (`https://pokemon.danielpimentel.com.br/v1/pokemon/geracao/${regiao}/151/1`)
      let dados = await resposta.json()
      setPokemons(dados.pokemon)
    }
    getPokemons()
  }, [regiao])


  function onRemove(numeroPokemon){
    let pokemonsUpdateList = pokemons.filter( item => item.numero != numeroPokemon)
    
    setPokemons(pokemonsUpdateList)
  }

  function onPokemonClicked(id) {
    // Leva para outra rota, semelhante ao Link
    router.push(`/pokemon/${id}`)
  }

  async function onFavorite(numero, favorito) {
    const resposta = await fetch('/api/favoritos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero, favorito }),
    })

    if (!resposta.ok) return

    setFavoritos((lista) => favorito
      ? [...lista, numero]
      : lista.filter((item) => item !== numero)
    )
  }

// map aplica uma operação ou funcao para todos os elementos de um conjunto 
// SPA - Single Page Application
  return (
    <div >
      <ul className="bg-sky-500 text-white flex gap-4 py-2 px-6">
        {regioes.map((item)=>(
          <li 
            key={'reg_'+item.id}
            className="cursor-pointer capitalize hover:text-red-700 transition-all duration-300"
            onClick={() => setRegiao(item.id)}
          >
            {item.nome}
          </li>
        ))}
        <li>
          <Link href="/sobre">Sobre</Link>
        </li>
        <li>
          <Link href="/favoritos">Favoritos</Link>
        </li>
      </ul>

      <div className="mt-6">
        <h1 className="text-2x1 text-center font-semibold">
          Pokemon
          
        </h1>

        <div className="flex gap-4 flex-wrap">
          {pokemons.map((item) => (
            <CardPokemon key={
              'poke_'+item.numero}
              pokemon={item}
              favorito={favoritos.includes(item.numero)}
              onFavorite={onFavorite}
              onRemove={onRemove}
              onSelected={onPokemonClicked}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
