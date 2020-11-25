####Simple API "foodchecker"

##usage:

Adding memeber:
`localhost:3016/member`

```
{
    "name":"Robert",
    "allergens":"mustard"
}
```

Removing member:
`localhost:3016/member/NAME`
example:
`localhost:3016/member/Robert`

Getting list of memebers:
`localhost:3016/members`
example result:

Getting list of memebers:
`localhost:3016/members`
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

