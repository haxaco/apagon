# Tracking Blackouts in Venezuela

Project is a part of the [Code for Venezuela codeathon](https://github.com/code-for-venezuela/2019-april-codeathon) challenge: [COD-BLA](https://github.com/code-for-venezuela/2019-april-codeathon/tree/master/challenges/COD-BLA).

## routes

### /

Our index endpoint. Will display main site.

### `/apagones`

Our API endpoint. Will serve data and take in `apagones` via post

- get:

  - filters (for the future not now):
    - region
    - parroquia
    - municipio
    - estado
    - ciudad

  - response data:

    - location: GeoJSON object. coordinates are in `[ longitude , latitude ]` order
    - source: Where the data was posted from Eg. "twitter", "whatsapp', "browser'
    - created_at: timestamp of when the data entry was made
    - type: the type of outage that this is. "power", "water"

    Example endpoint response.

    ```
    {
      data: [
        {
          location: {
            type: "point",
            coordinates: [ 40, 5 ]
          },
          source: '',
          create_at: '2019-01-01 01:00:00',
          type: ''
        }
      ]
    }
    ```

- post:
  
  Takes in post requests. POST schema:

  Eg. 1
  ```
  {
    "location": {
      "lat": 51.0,
      "lng": -0.1
    },
    "accuracy": 1200.4,
    "type": "power",
    "source": "browser"
  }
  ```

  Eg. 2
  ```
  {
    "location": {
      "lat": 51.0,
      "lng": -0.1
    },
    "accuracy": 1200.4,
    "type": "power",
    "source": "twitter"
  }
  ```

## Data models -- thoughts

### Collections

__apagones:__ main collection, will have geospatial data

- location: GeoJSON field of point type.
- source: where the data comes from. Eg. "twitter", "browser", "whatsapp", "facebook"
- created_at: date the data is inserted/created
- type: the type of the outage. Eg. "power", "water"

Eg schema

```
{
  location: {
    type: "point",
    coordinates: [ 40, 5 ]
  },
  source: '',
  create_at: '2019-01-01 01:00:00',
  type: ''
}
```
