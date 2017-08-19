---
title: Test

language_tabs:
  - javascript
  - bash

search: true
---

# Getting Started
This is a getting started guide for the World Music API.

# Getting Started Again!!!
This is a getting started guide for the World Music API.



# Things


## Gets all the Things

> Sample Request


```javascript
var a = 9

```

```ruby
something

```

> Sample Response

200 OK

```json
{
  "message": "Hello world"
}
```

This endpoint returns all the things

### Request

`GET /things`

### URL Parameters

Parameter | Default | Type  | Required  | Description
--------- | ------- | ----- | --------- | ----------
p1 |  | string  | false  | some queryParameters



### Response

A successful request returns the HTTP 201 Created status code and a JSON response body that 
shows plan details including the plan state and an ID that uniquely identifies the plan. The 
default state of a new plan is CREATED. Before you can create an agreement from a plan, you 
must activate the plan by updating its state to ACTIVE.



 
# Things/{id}


## Gets specifc Thing


> Sample Response

200 OK

```json
{
  "message": "Hello world"
}
```

This endpoint returns one thing

### Request

`GET /things/{id}`

### URL Parameters

Parameter | Default | Type  | Required  | Description
--------- | ------- | ----- | --------- | ----------
p1 |  | string  | false  | some queryParameters

### Query Parameters

Parameter | Default | Type  | Required  | Description
--------- | ------- | ----- | --------- | ----------
id |  | number  | true  | ID of this specific thing


### Response

A successful request returns the HTTP 201 Created status code and a JSON response body that 
shows plan details including the plan state and an ID that uniquely identifies the plan. The 
default state of a new plan is CREATED. Before you can create an agreement from a plan, you 
must activate the plan by updating its state to ACTIVE.



## Create specifc Thing


> Sample Response

200 OK

```json
{
  "message": "Hello world"
}
```

This endpoint creates one thing

### Request

`POST /things/{id}`


### Query Parameters

Parameter | Default | Type  | Required  | Description
--------- | ------- | ----- | --------- | ----------
id |  | number  | true  | ID of this specific thing

### Body Parameters

Parameter | Default | Type  | Required  | Description
--------- | ------- | ----- | --------- | ----------
p1 |  | string  |   | some body param

### Response

A successful request returns the HTTP 201 Created status code and a JSON response body that 
shows plan details including the plan state and an ID that uniquely identifies the plan. The 
default state of a new plan is CREATED. Before you can create an agreement from a plan, you 
must activate the plan by updating its state to ACTIVE.



