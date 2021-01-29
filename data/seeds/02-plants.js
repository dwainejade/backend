exports.seed = async function(knex) {
  await knex("plants").insert([
    {
      nickname: "Monster",
      species: "Monstera deliciosa",
      h2oFrequency: "every other week",
      user_id: 1,
      image: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg", 
    },
    {
      nickname: "Venus", 
      species: "Dionaea musciplua", 
      h2oFrequency: "every two weeks", 
      user_id: 1,
      image: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg", 
    },
    {
      nickname: "Dracaena", 
      species: "Dracaena trifasciata", 
      h2oFrequency: "once per week", 
      user_id: 1,
      image: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg", 
    },
    {
      nickname: "Spider Plant", 
      species: "Chlorophytum comosum", 
      h2oFrequency: "once per week", 
      user_id: 1,
      image: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg", 
    },
    {
      nickname: "Monster", 
      species: "Monstera deliciosa", 
      h2oFrequency: "every other week", 
      user_id: 2,
      image: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg", 
    },
    {
      nickname: "Venus", 
      species: "Dionaea musciplua", 
      h2oFrequency: "every two weeks", 
      user_id: 2,
      image: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg", 
    },
    {
      nickname: "Dracaena", 
      species: "Dracaena trifasciata", 
      h2oFrequency: "once per week", 
      user_id: 2,
      image: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg", 
    },
    {
      nickname: "Spider Plant", 
      species: "Chlorophytum comosum", 
      h2oFrequency: "once per week", 
      user_id: 2,
      image: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg", 
    },
    {
      nickname: "Venus", 
      species: "Dionaea musciplua", 
      h2oFrequency: "every two weeks", 
      user_id: 3,
      image: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg", 
    },
  ]);
};