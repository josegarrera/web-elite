interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

interface Location {
  name: string;
  url: string;
}

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('container');

  try {
    const response = await fetch(
      'https://rickandmortyapi.com/api/character'
    );
    const data = await response.json();
    const firstNineCharacters: Character[] = data.results.slice(0, 9);
    firstNineCharacters.forEach(character => {
      const card = document.createElement('div');
      card.classList.add('card');

      const img = document.createElement('img');
      img.src = character.image;
      img.alt = `${character.name} Image`;

      const name = document.createElement('h3');
      name.textContent = character.name;

      card.appendChild(img);
      card.appendChild(name);
      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    const errorMessage = document.createElement('h1');
    errorMessage.textContent =
      'An error occurred while fetching the data';
    container.appendChild(errorMessage);
  }
});