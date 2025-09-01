// function generateQuizzes(countries) {
//   const quizzes = [];

//   countries.forEach((country, index) => {
//     const quiz = [];

//     // 1. Capital City
//     if (country.capital && country.capital.length > 0) {
//       const correct = country.capital[0];
//       const wrongs = countries
//         .filter(c => c.capital && c.capital[0] && c.name.common !== country.name.common)
//         .map(c => c.capital[0]);

//       quiz.push({
//         question: `What is the capital city of ${country.name.common}?`,
//         options: shuffle([correct, ...pickRandom(wrongs, 3)]),
//         answer: correct
//       });
//     }

//     // 2. Continent
//     if (country.continents && country.continents.length > 0) {
//       const correct = country.continents[0];
//       const wrongs = countries
//         .filter(c => c.continents && c.continents[0] !== correct)
//         .map(c => c.continents[0]);

//       quiz.push({
//         question: `Which continent is ${country.name.common} located in?`,
//         options: shuffle([correct, ...pickRandom(wrongs, 3)]),
//         answer: correct
//       });
//     }

//     // 3. Subregion
//     if (country.subregion) {
//       const correct = country.subregion;
//       const wrongs = countries
//         .filter(c => c.subregion && c.subregion !== correct)
//         .map(c => c.subregion);

//       quiz.push({
//         question: `${country.name.common} is part of which subregion?`,
//         options: shuffle([correct, ...pickRandom(wrongs, 3)]),
//         answer: correct
//       });
//     }

//     // 4. Currency
//     if (country.currencies) {
//       const correct = Object.values(country.currencies)[0].name;
//       const wrongs = countries
//         .filter(c => c.currencies)
//         .map(c => Object.values(c.currencies)[0].name)
//         .filter(c => c !== correct);

//       quiz.push({
//         question: `What is the official currency of ${country.name.common}?`,
//         options: shuffle([correct, ...pickRandom(wrongs, 3)]),
//         answer: correct
//       });
//     }

//     // 5. Languages
//     if (country.languages) {
//       const correct = Object.values(country.languages).join(", ");
//       const wrongs = countries
//         .filter(c => c.languages)
//         .map(c => Object.values(c.languages).join(", "))
//         .filter(c => c !== correct);

//       quiz.push({
//         question: `What is the official language(s) spoken in ${country.name.common}?`,
//         options: shuffle([correct, ...pickRandom(wrongs, 3)]),
//         answer: correct
//       });
//     }

//     // 6. Population
//     if (country.population) {
//       const correct = approxPopulation(country.population);
//       const wrongs = countries
//         .filter(c => c.population && c.name.common !== country.name.common)
//         .map(c => approxPopulation(c.population));

//       quiz.push({
//         question: `What is the approximate population of ${country.name.common}?`,
//         options: shuffle([correct, ...pickRandom(wrongs, 3)]),
//         answer: correct
//       });
//     }

//     // 7. Landlocked
//     if (typeof country.landlocked === "boolean") {
//       quiz.push({
//         question: `Is ${country.name.common} a landlocked country?`,
//         options: ["Yes", "No"],
//         answer: country.landlocked ? "Yes" : "No"
//       });
//     }

//     // 8. Borders
//     quiz.push({
//       question: `Does ${country.name.common} share borders with other countries?`,
//       options: ["Yes", "No"],
//       answer: country.borders && country.borders.length > 0 ? "Yes" : "No"
//     });

// //     9.
// //    "question": "What is the official coat of arms symbol of Aruba available in (SVG/PNG)?", 
// //    "options": ["Yes", "No"], 
// //    "answer": "Yes"

// //    10.
// //     "question": "What time zone is Aruba in?", 
// //     "options": ["Atlantic Standard Time (AST)", "Eastern Standard Time (EST)", "Central Standard Time (CST)", "GMT"], 
// //     "answer": "Atlantic Standard Time (AST)"
//     // 11
//     // "question": "Which side of the road do people drive on in Aruba?", 
//     // "options": ["Right", "Left"], 
//     // "answer": "Right"

//     quizzes.push(...quiz);
//   });

//   return quizzes;
// }

// // Helpers
// function shuffle(arr) {
//   return arr.sort(() => Math.random() - 0.5);
// }

// function pickRandom(arr, n) {
//   const shuffled = [...new Set(arr)].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, n);
// }

// function approxPopulation(num) {
//   if (num > 1_000_000) return `${Math.round(num / 1_000_000)} million`;
//   if (num > 100_000) return `${Math.round(num / 1000) * 1000}`;
//   return num.toString();
// }
