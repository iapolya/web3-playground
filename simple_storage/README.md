# Ether Simple Storage

## Setup

Clone this repo

Then install dependencies

```
yarn
```

## Usage

1. RPC_URL и PRIVATE_KEY в .env. 

Самые простые варианты получения (будут дополнятся):

- Установить [Ganache](https://trufflesuite.com/ganache/), поднять блокчейн локально, взять один из тестовых аккаунтов для получения приватного ключа
- alchemy + собственный аккаунт на metamask

2. ``` yarn compile ```

На выходе получатся `SimpleStorage_sol_SimpleStorage.abi` и `SimpleStorage_sol_SimpleStorage.bin`

3. ``` ts-node deploy.js ```


## Шифрование PRIVATE KEY

1. В .env добавлем PRIVATE_KEY и PRIVATE_KEY_PASSWORD
2. Шифруем приватный ключ и удаляем PRIVATE_KEY и PRIVATE_KEY_PASSWORD!!!
```
ts-node encryptKey.ts
```
3. Деплой
```
PRIVATE_KEY_PASSWORD=your_password_maaan ts-node deploy.ts
```