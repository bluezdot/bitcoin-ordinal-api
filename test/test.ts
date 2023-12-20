import axios from 'axios';

// const pageSize = 1;
// let allResults = [];

// async function fetchPage(url?: string): Promise<void> {
//     const configListOrdinals = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `https://api.hiro.so/ordinals/v1/inscriptions?limit=${pageSize}`,
//         headers: { 
//             'Accept': 'application/json'
//         }
//     };
// }

// try {
//     const response = await axios.request(configListOrdinals);
//     const pageResults = response.data.results;
//     allResults = allResults.concat(pageResults);

//     if (response.data.next) {
//       // Fetch next page if available
//       await fetchPage(response.data.next);
//     }
//   } catch (error) {
//     console.error(`Failed to get ${address} balances`, error);
//   }
// }

// await fetchPage();

//   return allResults;
// }

async function getBalances(address: string) {
    const pageSize = 2;
    let allResults = [];
  
    async function fetchPage(url?: string): Promise<void> {
      const configListOrdinals = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.hiro.so/ordinals/v1/inscriptions?limit=${pageSize}`,
        headers: {
          'Accept': 'application/json',
        },
      };
  
      try {
        const response = await axios.request(configListOrdinals);
        const pageResults = response.data.results;
        allResults = allResults.concat(pageResults);
  
        if (response.data.next) {
          // Fetch next page if available
          await fetchPage(response.data.next);
        }
      } catch (error) {
        console.error(`Failed to get ${address} balances`, error);
      }
    }
  
    // Start fetching the first page
    await fetchPage();
  
    return allResults;
}

getBalances('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2').then((result) => { console.log(result) });


