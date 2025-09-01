// src/utils/quizGenerator.js

// Utility: shuffle an array (Fisher-Yates)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Utility: approximate population (rounded nicely)
function approxPopulation(num) {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

/**
 * Generate quizzes from country data
 * Each country contributes 1 random question
 */
export function generateQuizzes(countries) {
  let quizzes = [];

  countries.forEach((country) => {
    const quiz = [];

    // 1. Capital
    if (country.capital?.length > 0) {
      const correct = country.capital[0];
      const wrongs = countries
        .filter(c => c.capital?.[0] && c.name.common !== country.name.common)
        .map(c => c.capital[0]);

      quiz.push({
        type: "capital",
        question: `What is the capital of ${country.name.common}?`,
        options: shuffleArray([correct, ...shuffleArray(wrongs).slice(0, 3)]),
        answer: correct,
      });
    }

    // 2. Region
    if (country.region) {
      const correct = country.region;
      const wrongs = [...new Set(
        countries.filter(c => c.region && c.region !== correct).map(c => c.region)
      )];

      quiz.push({
        type: "region",
        question: `${country.name.common} is located in which region?`,
        options: shuffleArray([correct, ...shuffleArray(wrongs).slice(0, 3)]),
        answer: correct,
      });
    }

    // 3. Flag
    if (country.flags?.png) {
      const correct = country.name.common;
      const wrongs = countries
        .filter(c => c.name.common !== correct)
        .map(c => c.name.common);

      quiz.push({
        type: "flag",
        question: "Which country does this flag belong to?",
        flag: country.flags.png,
        options: shuffleArray([correct, ...shuffleArray(wrongs).slice(0, 3)]),
        answer: correct,
      });
    }

    // 4. Continent
    if (country.continents?.length > 0) {
      const correct = country.continents[0];
      const wrongs = countries
        .filter(c => c.continents?.[0] && c.continents[0] !== correct)
        .map(c => c.continents[0]);

      quiz.push({
        type: "continent",
        question: `Which continent is ${country.name.common} located in?`,
        options: shuffleArray([correct, ...shuffleArray(wrongs).slice(0, 3)]),
        answer: correct,
      });
    }

    // 5. Subregion
    if (country.subregion) {
      const correct = country.subregion;
      const wrongs = countries
        .filter(c => c.subregion && c.subregion !== correct)
        .map(c => c.subregion);

      quiz.push({
        type: "subregion",
        question: `${country.name.common} is part of which subregion?`,
        options: shuffleArray([correct, ...shuffleArray(wrongs).slice(0, 3)]),
        answer: correct,
      });
    }

    // 6. Currency
    if (country.currencies) {
      const correct = Object.values(country.currencies)[0]?.name;
      const wrongs = countries
        .filter(c => c.currencies)
        .map(c => Object.values(c.currencies)[0]?.name)
        .filter(c => c && c !== correct);

      quiz.push({
        type: "currency",
        question: `What is the official currency of ${country.name.common}?`,
        options: shuffleArray([correct, ...shuffleArray(wrongs).slice(0, 3)]),
        answer: correct,
      });
    }

    // 7. Languages
    if (country.languages) {
      const correct = Object.values(country.languages).join(", ");
      const wrongs = countries
        .filter(c => c.languages)
        .map(c => Object.values(c.languages).join(", "))
        .filter(c => c && c !== correct);

      quiz.push({
        type: "languages",
        question: `What language(s) are officially spoken in ${country.name.common}?`,
        options: shuffleArray([correct, ...shuffleArray(wrongs).slice(0, 3)]),
        answer: correct,
      });
    }

    // 8. Population
    if (country.population) {
      const correct = approxPopulation(country.population);
      const wrongs = countries
        .filter(c => c.population && c.name.common !== country.name.common)
        .map(c => approxPopulation(c.population));

      quiz.push({
        type: "population",
        question: `What is the approximate population of ${country.name.common}?`,
        options: shuffleArray([correct, ...shuffleArray(wrongs).slice(0, 3)]),
        answer: correct,
      });
    }

    // 9. Landlocked (Yes/No)
    if (typeof country.landlocked === "boolean") {
      quiz.push({
        type: "landlocked",
        question: `Is ${country.name.common} landlocked?`,
        options: ["Yes", "No"],
        answer: country.landlocked ? "Yes" : "No",
      });
    }

    // 10. Borders (Yes/No)
    quiz.push({
      type: "borders",
      question: `Does ${country.name.common} share borders with other countries?`,
      options: ["Yes", "No"],
      answer: country.borders?.length > 0 ? "Yes" : "No",
    });

    // 11. Coat of Arms (Yes/No)
    if (country.coatOfArms?.svg || country.coatOfArms?.png) {
      quiz.push({
        type: "coatOfArms",
        question: `Does ${country.name.common} have an official coat of arms?`,
        options: ["Yes", "No"],
        answer: "Yes",
      });
    }

    // 12. Timezone
    if (country.timezones?.length > 0) {
      const correct = country.timezones[0];
      const wrongs = countries
        .filter(c => c.timezones?.[0] && c.timezones[0] !== correct)
        .map(c => c.timezones[0]);

      quiz.push({
        type: "timezone",
        question: `What time zone is ${country.name.common} in?`,
        options: shuffleArray([correct, ...shuffleArray(wrongs).slice(0, 3)]),
        answer: correct,
      });
    }

    // 13. Driving Side
    if (country.car?.side) {
      quiz.push({
        type: "driving",
        question: `Which side of the road do people drive on in ${country.name.common}?`,
        options: ["Right", "Left"],
        answer: country.car.side === "right" ? "Right" : "Left",
      });
    }

    // ✅ Pick 1 random question for this country
    if (quiz.length > 0) {
      quizzes.push(quiz[Math.floor(Math.random() * quiz.length)]);
    }
  });

  // Shuffle all questions globally
  return shuffleArray(quizzes);
}
