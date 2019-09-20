module.exports = (data, dataLocale, speciesId) => {
  const { evolution_chain_id: evolutionChainId } = data.species.find(
    (speciesData) => speciesData.id == speciesId
  );

  return data.species
    .filter((speciesData) => speciesData.evolution_chain_id == evolutionChainId)
    .map((speciesData) => {
      const { name } = dataLocale.names.find(
        (pokemonNameData) =>
          pokemonNameData.pokemon_species_id == speciesData.id
      );

      const { order } = data.pokemon.find(
        (pokemonData) => pokemonData.species_id == speciesData.id
      );

      const evolution =
        data.evolution.find(
          (evolutionData) => evolutionData.evolved_species_id == speciesData.id
        ) || {};

      return {
        name,
        currentPokemon: speciesData.id == speciesId,
        id: speciesData.id,
        level: evolution.minimum_level || 0,
        order
      };
    })
    .sort((a, b) => a.order - b.order);
};
