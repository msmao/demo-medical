### 报表

|序号| 接口               |路径       |方法 |
|:---|:-----------------|:----------|----|:----|:---:|:----:|:---:|
|   1|[用户登记](#用户登记)       |/api/register      |POST|
|   2|[分页获取病人信息](#分页获取病人信息)       |/api/patients      |POST|
|   3|[文件上传](#文件上传)       |/api/upload    |POST|


#### 用户登记

|接口   | /api/register |
|:------|:----------:|
|方法    |POST  |
|HTTP返回值|200 |
|入参    |详见入参|
|返回值  |相应数据|
|业务场景|用户登记|
|下一步骤|等待用户选择下一步操作|

入参示例:

~~~json
{
  "name": "san zhang", // 姓名
  "birthday": 966614400000, // 生日时间戳
  "phone": 151123456789, // 手机号码
  "email": "xxx@xxx.com", // 邮箱地址
  "address": "china zhejiang hangzhou", // 居住地址
  "photo": "/static/2021/01/01/xxxx.jpg", // 驾驶证照片路径
  "appointment_time": "1629340481000", // 预约时间
}
~~~

返回示例: 

~~~json
{
    "status": "ok",
    "data": {
      "ID": 12, // 序号
      "name": "san zhang", // 姓名
      "birthday": 966614400000, // 生日时间戳
      "phone": 151123456789, // 手机号码
      "email": "xxx@xxx.com", // 邮箱地址
      "address": "china zhejiang hangzhou", // 居住地址
      "photo": "/static/2021/01/01/xxxx.jpg", // 驾驶证照片路径
      "appointment_time": "1629340481000", // 预约时间
    }
}
~~~


#### 分页获取病人信息

|接口   | /api/patients |
|:------|:----------:|
|方法    |GET  |
|HTTP返回值|200 |
|入参    |详见入参|
|返回值  |相应数据|
|业务场景|用户登记|
|下一步骤|等待用户选择下一步操作|

入参示例: url 形式

~~~json
{
  "current":  1, // 当前页码
  "pageSize": 20, // 每页数量
}
~~~

返回示例:

~~~json
{
    "status": "ok",
    "total": 15,
    "data": [
      {
        "ID": 12, // 序号
        "name": "san zhang", // 姓名
        "birthday": 966614400000, // 生日时间戳
        "phone": 151123456789, // 手机号码
        "email": "xxx@xxx.com", // 邮箱地址
        "address": "china zhejiang hangzhou", // 居住地址
        "photo": "/static/2021/01/01/xxxx.jpg", // 驾驶证照片路径
        "appointment_time": "1629340481000", // 预约时间
      },
      //...
    ]
}
~~~

#### 文件上传

|接口   | /api/upload |
|:------|:----------:|
|方法    | POST  |
|HTTP返回值|200 |
|入参    |详见入参|
|返回值  |相应数据|
|业务场景|用户登记|
|下一步骤|等待用户选择下一步操作|

入参示例: form-data 形式

~~~json
{
  "file": "文件", // 文件
}
~~~

返回示例:

~~~json
{
    "status": "ok",
    "data": {
      "filepath": "/static/xxx/xx/xx/xxxx.xx", // 文件路径
    }
}
~~~