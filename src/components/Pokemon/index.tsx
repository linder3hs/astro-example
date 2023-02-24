import { useState, useEffect } from "react"

export interface Poke {
  name: string;
  url: string;
}

export default function Pokemon() {
  const [pokemons, setPokemons] = useState<Poke[]>([])

  const [currentURL, setCurrentURL] = useState<string | null>("https://pokeapi.co/api/v2/pokemon/")

  const [previousURL, setPreviousURL] = useState<string | null>(null)

  const fetchData = async (url: string | null) => {
    if (!url) return;
    const response = await fetch(url)
    const {results, next, previous} = await response.json()
    setCurrentURL(next)
    setPreviousURL(previous)
    setPokemons(results)
  }

  const fetchPokemonsPrev = async () => await fetchData(previousURL)

  const fetchPokemons = async () =>    await fetchData(currentURL)  

  const getIdFromUrl = (url: string): string | undefined =>  url.split("/").at(-2)

  useEffect(() => {
    fetchPokemons()
  }, [])

  return (
    <>
      <div className="flex flex-wrap gap-10 mt-10">
        {
          pokemons.map((pokemon: Poke, index: number) => (
            <div className="w-96 bg-white p-10 text-center" key={pokemon.name}>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getIdFromUrl(pokemon.url)}.png`} alt="" />
              <h3 className="font-extrabold capitalize text-xl">{pokemon.name}</h3>
            </div>
          ))
        }
      </div>
      <div className="flex gap-10 justify-center">
        {
          previousURL && (
            <button onClick={fetchPokemonsPrev} className="bg-red-400 py-2  px-4 mt-10 hover:bg-red-600 rounded-md text-white">Back</button>
          )
        }
        <button onClick={fetchPokemons} className="bg-red-400 py-2  px-4 mt-10 hover:bg-red-600 rounded-md text-white">Next</button>
      </div>
    </>
  )
}
