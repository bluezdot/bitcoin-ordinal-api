import axios from 'axios';
import * as fs from 'fs';
import { HIRO_APIs } from 'constant.ts';

// const TEST_ADDRESS = 'bc1psu0gqjuyzc5dtcrqu6ewkfe9y94cnm3pjn4vhgem9nr0hzl6w3hqj24zq9';
// const TEST_ADDRESS = 'bc1p5zy5mrjfz00lr7nvy3vzvusdws85ldxzrqxacgajqwurc70wqsqsdx5ye6';
// const TEST_ADDRESS = 'bc1q8cpn3zl6lz5xrxdqgx7j68ggcpjm7ctzyds82c';
const TEST_ADDRESS = 'bc1pwjc350r3vcw70n3x597vlksxcsdahfea3q6vg3gt0ws7fa95vrqsuhqktz'; // HAS BRC-20

interface BRC20 {
    ticker: string,
    available_balance: string,
    transferrable_balance: string,
    overall_balance: string
}

async function getBRC20Balances(address: string) {
    let configContent = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.hiro.so/ordinals/v1/brc-20/balances/${TEST_ADDRESS}`,
        headers: {
          'Accept': 'application/json'
        }
      };

      try {
        const response = await axios.request(configContent);
        // console.log(response.data);
        return response.data['results'];
      } catch (error) {
        console.error(`Failed to get brc-20 balances of address: ${address}`, error);
      }
}

async function handleBRC20() {
    try {
        const balances = await getBRC20Balances(TEST_ADDRESS);
        if (balances) {
            const BRC20_list: BRC20[] = balances.map((brc20: { ticker: string; available_balance: string; transferrable_balance: string; overall_balance: string; }) => {
              return {
                ticker: brc20.ticker,
                available_balance: brc20.available_balance,
                transferrable_balance: brc20.transferrable_balance,
                overall_balance: brc20.overall_balance,
              };
        });

        //     // const ordinal_list = await Promise.all(ordinalPromises) as BRC20[];
            console.log(BRC20_list);
        //     // // WRITE OUTPUT TO A FILE
        //     // fs.writeFileSync('/output/output.txt', JSON.stringify(ordinal_list), 'utf-8');
        }

    } catch (error) {
    console.error(`Failed to fetch brc20`, error);
    }
}

handleBRC20();