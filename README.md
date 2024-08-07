# second live-bot

second live-bot is a Telegram automation tool designed to help you manage and interact with [secondlive bot](https://t.me/Secondlive_bot/app?startapp=oo0mr0j5).

<p align="center">
  <img src="public/secondlive.png" alt="cowtopia" width="300"/>
</p>

### Features

- Auto claim daily checkin
- Auto claim mining crush
- Auto upgrade crush locker level
- Auto daily spinner
- support multi account

### How to use

you can clone repository and add your token authorization

- Clone repository

```bash
git clone https://github.com/dkzhen/secondlive-bot.git
```

- add config.json on folder configs

```json
[
  {
    "token": "eyJh"
  },
  {
    "token": "eyJh"
  }
]
```

- install modules

```bash
npm install
```

- running script

```bash
npm run start
```

[ WARNING ] this bot in development stage, if bot error you can try again. some error or bug will be fixed.

### Token authorization

You can found on inspact element [F12] from telegram web. open the bot and see [ `on Headers Authorization from api request from cowtopia` ]

- `Authorization: eyJ..`

- example Authorization

```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YWxsZXRfYWRkcmVzcyI6IjB4ZkM3NEQzMkY3NzZBNDY5NzQ2ODA5MmI3ZmUzYzRjMDk4ODIzNTk3OSIsInVzZXJfaWQiOiI2NjcyNWJjMTQzNDRhZTJmMWEwNDdmZjUiLCJ0Z19pZCI6IjE0OTMyMzExMTUiLCJ1c2VybmFtZSI6IjE0OTMyMzExMTUiLCJpYXQiOjE3MjA1MTQ2MjAsImV4cCI6MTcyMTExOTQyMH0.1AE50yLVEw_Eda1NbpvyojhQ0oLq4hm8vJEAXKx8zMA"
```

### Contact

You can contact me for more information or report an issue.

- [GitHub](https://github.com/dkzhen)

- [Telegram](https://t.me/dk_zhen2)
