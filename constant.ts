export const HIRO_APIs = {
    api_status: 'https://api.hiro.so/ordinals/v1/',
    
    list_of_incriptions: 'https://api.hiro.so/ordinals/v1/inscriptions',
    transfers_per_block: 'https://api.hiro.so/ordinals/v1/inscriptions/transfers',
    specific_inscription: 'https://api.hiro.so/ordinals/v1/inscriptions/:id',
    inscription_content: 'https://api.hiro.so/ordinals/v1/inscriptions/:id/content',
    inscription_transfers: 'https://api.hiro.so/ordinals/v1/inscriptions/:id/transfers',
    
    satoshi_ordinal: 'https://api.hiro.so/ordinals/v1/sats/:ordinal',
    satoshi_inscriptions: 'https://api.hiro.so/ordinals/v1/sats/:ordinal/inscriptions',
    
    inscription_count_per_block:'https://api.hiro.so/ordinals/v1/stats/inscriptions',
    
    brc20_tokens: 'https://api.hiro.so/ordinals/v1/brc-20/tokens',
    brc20_token_details: 'https://api.hiro.so/ordinals/v1/brc-20/tokens/:ticker',
    brc20_token_holders: 'https://api.hiro.so/ordinals/v1/brc-20/tokens/:ticker/holders',
    brc20_balances: 'https://api.hiro.so/ordinals/v1/brc-20/balances/:address',
    brc20_activity: 'https://api.hiro.so/ordinals/v1/brc-20/activity'
}