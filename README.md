## Project - JOPrep

![image](https://github.com/Moriarity-2k/Joprep/assets/143058936/788ee392-02e8-431f-b4c2-3a1b394f6004)


### Tech used
- NextJs with Typescript
- Tailwind CSS

## API Reference

#### POST req to register uer

```http
  POST /api/profile
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  | `string` | **Required**. User details |

#### Get req to fetch the user

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

