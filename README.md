
# Simple API "foodchecker"

## usage:

### Adding memeber:
POST `localhost:3016/member`

```
{
    "name":"Robert",
    "allergens":"mustard"
}
```

###  Removing member:
DELETE `localhost:3016/member/NAME`
example:
DELETE `localhost:3016/member/Robert`

###  Adding or removing Allergen to chosen member:
PUT/DELETE `localhost:3016/member/allergen`
with example json:
```
{
    "allergens":["milk","eggs"]
}
```

###  You can get list of Allergens by:
GET `localhost/allergens`

###  Getting list of memebers:
`localhost/members`
```
[
  {
    "name": "Adam",
    "allergens": "eggs,milk"
  },
  {
    "name": "Albert",
    "allergens": "gluten,fish"
  },
  {
    "name": "Anna",
    "allergens": "mustard"
  },
  {
    "name": "Chris",
    "allergens": "mustard"
  },
  {
    "name": "John",
    "allergens": "gluten,eggs"
  },
  {
    "name": "Tom",
    "allergens": ""
  }
]
```

###  Adding product:
POST `localhost:3016/product`

```
{"barcode":"5050083516313"}
```

###  Removing product:
DELETE `localhost:3016/product/BARCODE`
example:
DELETE `localhost:3016/member/5050083516313`

###  Getting list of products:
`localhost:3016/products`
example result:
```
[
  {
    "name": "Prince Chocolat blé complet",
    "barcode": "7622210449283",
    "allergens": "gluten,milk,soybeans"
  },
  {
    "name": "Pain AMERICAN SANDWICH complet",
    "barcode": "3228857000906",
    "allergens": "gluten"
  },
  {
    "name": "Biscottes 6 Céréales",
    "barcode": "3392460480827",
    "allergens": "gluten,sesame-seeds,avoine"
  }
]
```
###  Getting list what they can eat

GET `localhost:3016/caneat`

example result:
```
[
  {
    "name": "Adam",
    "can_eat": [
      {
        "name": "Pain AMERICAN SANDWICH complet",
        "barcode": "3228857000906"
      },
      {
        "name": "Biscottes 6 Céréales",
        "barcode": "3392460480827"
      }
    ]
  },
  {
    "name": "Albert",
    "can_eat": []
  },
  {
    "name": "Anna",
    "can_eat": [
      {
        "name": "Prince Chocolat blé complet",
        "barcode": "7622210449283"
      },
      {
        "name": "Pain AMERICAN SANDWICH complet",
        "barcode": "3228857000906"
      },
      {
        "name": "Biscottes 6 Céréales",
        "barcode": "3392460480827"
      }
    ]
  },
  {
    "name": "Chris",
    "can_eat": [
      {
        "name": "Prince Chocolat blé complet",
        "barcode": "7622210449283"
      },
      {
        "name": "Pain AMERICAN SANDWICH complet",
        "barcode": "3228857000906"
      },
      {
        "name": "Biscottes 6 Céréales",
        "barcode": "3392460480827"
      }
    ]
  },
  {
    "name": "John",
    "can_eat": []
  },
  {
    "name": "Tom",
    "can_eat": [
      {
        "name": "Prince Chocolat blé complet",
        "barcode": "7622210449283"
      },
      {
        "name": "Pain AMERICAN SANDWICH complet",
        "barcode": "3228857000906"
      },
      {
        "name": "Biscottes 6 Céréales",
        "barcode": "3392460480827"
      }
    ]
  }
]
```


