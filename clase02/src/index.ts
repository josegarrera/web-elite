import { Character } from './interfaces';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('container');

  try {
    const allCharacters: Character[] = await fetchCharactersData();
    const firstNineCharacters: Character[] =
      extractFirstNineResults(allCharacters);
    renderCharacterCards(firstNineCharacters, container);
  } catch (error) {
    console.error(error);
    const errorMessage = document.createElement('h1');
    errorMessage.textContent =
      'An error occurred while fetching the data';
    container.appendChild(errorMessage);
  }
});

const fetchCharactersData = async (): Promise<Character[]> => {
  const response = await fetch(
    'https://rickandmortyapi.com/api/character'
  );
  const data = await response.json();
  return data.results;
};

const extractFirstNineResults = (
  results: Character[]
): Character[] => {
  return results.slice(0, 9);
};

const renderCharacterCards = (
  firstNineCharacters: Character[],
  container: HTMLElement
) => {
  firstNineCharacters.forEach(character => {
    const card = createCharacterCard(character);
    container.appendChild(card);
  });
};

const createCharacterCard = character => {
  const card = buildCardElement();

  const img = buildImageElement(character);

  const name = buildTitleElement(character);

  card.appendChild(img);
  card.appendChild(name);

  return card;
};

const buildCardElement = () => {
  const card = document.createElement('div');
  card.classList.add('card');
  return card;
};

const buildImageElement = (character: Character) => {
  const img = document.createElement('img');
  img.src = character.image;
  img.alt = `${character.name} Image`;
  return img;
};

const buildTitleElement = (character: Character) => {
  const name = document.createElement('h3');
  name.textContent = character.name;
  return name;
};
