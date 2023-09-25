async function fetchRoadsData() {
    try {
      const response = await fetch('https://nestro.pavel0dibr.repl.co/main'); 
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  