# 題⽬⼀
⽬前 AsiaYo 營運⼈員想知道 2021 年 2 ⽉，前 10 名最多訂單數的旅宿，當排名相同則由旅
宿 id 由⼤到⼩排序，請⽤⼀條 SQL 查詢出結果。答案也請附上您建立資料表的 SQL 以及使
⽤的資料庫，並說明如果由您來規劃，您會如何調整資料表結構。
- 旅宿資料表 (property)：id, name
- 房間資料表 (room)：id, property_id, name
- 訂單資料表 (orders)：id, room_id, price, created_at

## **使用資料庫為 PostgreSQL 10.20**
```sql
CREATE TABLE "property" (
  "id" serial NOT NULL,
  "name" varchar(255) NOT NULL,
  PRIMARY KEY ("id")
);
```

```sql
CREATE TABLE "room" (
  "id" serial NOT NULL,
  "property_id" int NOT NULL,
  "name" varchar(100) NOT NULL,
  PRIMARY KEY ("id")
);
```

```sql
CREATE TABLE "orders" (
  "id" serial NOT NULL,
  "room_id" int NOT NULL,
  "price" int NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id", "created_at")
);
```

``` sql
select p.*, count(p.id) as orderCount from orders o 
  join room r on (o.room_id = r.id)
  join property p on (r.property_id = p.id)
where 
  o.created_at between '2021-02-01 00:00:00' and '2021-02-28 23:59:59'
group by p.id
order by 
  orderCount desc,
  p.id desc
limit 10;
```
---
# 題⽬⼆
根據題⽬⼀的查詢，發現查詢速度過慢（超過 10 秒），您覺得問題可能會是什麼？您會嘗試
如何調整？請試著闡述您的⽅法。

### 1. 資料量過大
根據資料保存政策進行資料封存

### 2. 資料表攤平
以上方回答 SQL 為例，orders - rooms - property 為 1-1-1 的關聯<sup>1</sup>，把 結構變更為如下即可減少查詢時所 join 的表格

#### Orders
```sql
CREATE TABLE "orders" (
  "id" serial NOT NULL,
  "room_id" int NOT NULL,
  "property_id" int NOT NULL,
  "price" int DEFAULT NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id", "created_at")
);
```

#### Room
```sql 
CREATE TABLE "room" (
  "id" serial NOT NULL,
  "name" varchar(100) NOT NULL,
  PRIMARY KEY ("id")
);
```
---
*１. 由於三張 table 的 id 皆為 `serial` 型態，表示不會出現 Room Id 一對多 Property Id 的情形，所以可將 Room 及 Property 關聯進行分離
