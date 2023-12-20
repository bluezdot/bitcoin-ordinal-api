import axios from 'axios';
import * as fs from 'fs';
import { HIRO_APIs } from '/Users/truong/alone/bitcoin-ordinal-api/constant';

// const TEST_ADDRESS = 'bc1psu0gqjuyzc5dtcrqu6ewkfe9y94cnm3pjn4vhgem9nr0hzl6w3hqj24zq9';
const TEST_ADDRESS = 'bc1p5zy5mrjfz00lr7nvy3vzvusdws85ldxzrqxacgajqwurc70wqsqsdx5ye6';
// const TEST_ADDRESS = 'bc1q8cpn3zl6lz5xrxdqgx7j68ggcpjm7ctzyds82c';

interface Inscription {
    id: string;
    number: number;
    address: string;
    block: number;
    block_hash: string;
    timestamp: number;
    tx_id: string;
    location: string;
    output: string;
    value: number;
    fee: number;
    sat_ordinal: number;
    sat_rarity: string;
    content_type: string;
    content_length: number;
    content: any;
}

async function getBalances(address: string) {
  const pageSize = 50;
  let offset = 0;
  const ordinalsFullList: Array<any> = [];

  let configListOrdinals = {
    method: 'get',
    maxBodyLength: Infinity,
    url: HIRO_APIs.list_of_incriptions + `?address=${address}&limit=${pageSize}&offset=${offset}`,
    headers: { 
      'Accept': 'application/json'
    }
  };

  try {
    while (true) {
      const response = await axios.request(configListOrdinals);
      // check if response is a null array
      if (response.data['results'].length !== 0) {
        const a: Array<any> = [];
        ordinalsFullList.push(...response.data['results']);
        offset += pageSize;
        configListOrdinals['url'] = HIRO_APIs.list_of_incriptions + `?address=${address}&limit=${pageSize}&offset=${offset}`;
      }
      else {
        break;
      }
    }

    return ordinalsFullList;

  } catch (error) {
    console.error(`Failed to get ${address} balances`, error);
  }
}

async function getOrdinalContent(id: string) {
    let configContent = {
        method: 'get',
        maxBodyLength: Infinity,
        url: HIRO_APIs.inscription_content.replace(':id', id),
        headers: { 
          'Accept': 'application/json'
        }
      };

      try {
        const response = await axios.request(configContent);
        return response.data;
      } catch (error) {
        console.error(`Failed to get content of ordinal with id: ${id}`, error);
      }
}

async function handleOrdinals() {
    try {
        const balances = await getBalances(TEST_ADDRESS);
        if (balances) {
            const ordinalPromises: Promise<Inscription | undefined>[] = balances.map(async (ordinal: { id: string; number: any; address: any; genesis_block_height: string; genesis_block_hash: any; genesis_timestamp: any; genesis_tx_id: any; location: any; output: any; value: string; genesis_fee: string; sat_ordinal: string; sat_rarity: any; content_type: any; content_length: any; }) => {
              if (ordinal.content_type === 'text/plain') {
                return undefined;
              }
              const content = await getOrdinalContent(ordinal.id);
              return {
                  id: ordinal.id,
                  number: ordinal.number,
                  address: ordinal.address,
                  block: parseInt(ordinal.genesis_block_height),
                  block_hash: ordinal.genesis_block_hash,
                  timestamp: ordinal.genesis_timestamp,
                  tx_id: ordinal.genesis_tx_id,
                  location: ordinal.location,
                  output: ordinal.output,
                  value: parseInt(ordinal.value),
                  fee: parseInt(ordinal.genesis_fee),
                  sat_ordinal: parseInt(ordinal.sat_ordinal),
                  sat_rarity: ordinal.sat_rarity,
                  content_type: ordinal.content_type,
                  content_length: ordinal.content_length,
                  content: content,
              };
        });
            const ordinal_list = (await Promise.all(ordinalPromises)).filter(Boolean) as Inscription[];
            const filePath = 'output.txt';
            fs.writeFileSync(filePath, JSON.stringify(ordinal_list), 'utf-8');
        }

    } catch (error) {
    console.error(`Failed to fetch ordinals`, error);
    }
}

handleOrdinals();