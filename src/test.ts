import axios from 'axios';
import * as fs from 'fs';
import { HIRO_APIs } from '/Users/truong/alone/bitcoin-ordinal-api/constant';
const TEST_ADDRESS = 'bc1q8cpn3zl6lz5xrxdqgx7j68ggcpjm7ctzyds82c';

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
  let configListOrdinals = {
    method: 'get',
    maxBodyLength: Infinity,
    url: HIRO_APIs.list_of_incriptions + `?${address}&limit=50`,
    headers: { 
      'Accept': 'application/json'
    }
  };

  try {
    const response = await axios.request(configListOrdinals);
    return response.data['results'];
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
        // console.log(balances);

        if (balances) {
            const ordinal_list: Inscription[] = [];
            for (const ordinal of balances) {
                const content = await getOrdinalContent(ordinal.id);
                // console.log(content);

                const parsedOrdinal: Inscription =  {
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
                    content: content
                };
                // Push to params
                ordinal_list.push(parsedOrdinal);
            }
            const filePath = 'output.txt';
            fs.writeFileSync(filePath, JSON.stringify(ordinal_list), 'utf-8');
        
            // console.log(ordinal_list);
            // return ordinal_list;
        }
    } catch (error) {
    console.error(`Failed to fetch ordinals`, error);
}
}

console.log(handleOrdinals());