const app = Vue.createApp({
  data() {
      return {
          randomFact: '',
          weather: {
              city: '',
              temperature: '',
              wind: '',
              description: ''
          },
          definition: {
              word: '',
              phonetic: '',
              partOfSpeech: '',
              definition: ''
          },
      }; 
  },

  created() {
      this.fetchRandomFact();
      this.fetchWeather();
  },
  
  methods: {
      // Fetches useless random facts from the API
      fetchRandomFact() {
          fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
              .then(response => response.json())
              .then(data => {
                  this.randomFact = data.text;
              })
              .catch(error => {
                  console.error('Error: ', error, );
              });
      },

      // Fetches the weather from the API
      fetchWeather() {
        const city = this.city || 'London';
        fetch(`https://goweather.herokuapp.com/weather/${this.city}`)  
            .then(response => response.json())
            .then(data => {
                this.weather = {
                    city: city,
                    temperature: data.temperature,
                    wind: data.wind,
                    description: data.description
                };
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
            });
      },
    
      // Fetches the definition of a word from the dictionary API
      fetchDefinition() {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
            .then(response => response.json())
            .then(data => {
                const meaning = data[0].meanings[0];
                this.definition = {
                    word: data[0].word,
                    phonetic: data[0].phonetic,
                    partOfSpeech: meaning.partOfSpeech,
                    definition: meaning.definitions[0].definition
                };
            })
            .catch(error => {
                console.error('Error fetching definition:', error);
            });
      }
  }
});

// Mount the Vue app to the DOM element
app.mount('#app');
