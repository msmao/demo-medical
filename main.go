package main

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"path"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Users struct {
	ID              uint   `json:”id”`
	Name            string `json:"name"`
	Birthday        uint64 `json:"birthday"`
	Phone           uint64 `json:"phone"`
	Email           string `json:"email"`
	Address         string `json:"address"`
	Photo           string `json:"photo"`
	AppointmentTime uint64 `json:"appointment_time"`
}

var db *gorm.DB
var err error

func main() {

	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}
	db.AutoMigrate(&Users{})

	r := gin.Default()

	// 5 MiB 设置最大的上传文件的大小
	r.MaxMultipartMemory = 5 << 20

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"message": "/api",
		})
	})

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"message": "pong",
		})
	})

	r.Static("/static", "./static")

	// 文件上传
	r.POST("/api/upload", func(c *gin.Context) {

		f, err := c.FormFile("file")
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"status":  "error",
				"message": err,
			})
		}

		num := rand.New(rand.NewSource(time.Now().UnixNano())).Int31n(1000000)
		f.Filename = fmt.Sprintf("%d%d%s", time.Now().UnixNano(), num, path.Ext(f.Filename))
		filePath := path.Join("./static", time.Now().Format("2006/01/02"))
		if _, err := os.Stat(filePath); err != nil {
			if !os.IsExist(err) {
				os.MkdirAll(filePath, os.ModePerm)
			}
		}
		filePath = path.Join(filePath, f.Filename)

		err = c.SaveUploadedFile(f, filePath)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"status":  "error",
				"message": err,
			})
		}

		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
			"data": gin.H{
				"filepath": "/" + filePath,
			},
		})
	})

	// 用户登记
	r.POST("/api/register", func(c *gin.Context) {

		// 前端校验，后端在网关层校验

		var user Users
		c.BindJSON(&user)
		log.Printf("%v", &user)
		db.Create(&user)

		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
			"data":   user,
		})
	})

	// 获取所有病人信息
	r.GET("/api/patients", func(c *gin.Context) {
		var (
			limit  = 20
			offset = 0
		)
		current, _ := strconv.Atoi(c.DefaultQuery("current", "1"))
		pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "20"))
		if current > 0 && pageSize > 0 {
			limit = pageSize
			offset = (current - 1) * limit
		}

		var users []Users

		var total int64 = 0
		db.Model(&Users{}).Count(&total)
		db.Order("ID desc").Offset(offset).Limit(limit).Find(&users)

		log.Printf("current:%v, pagesize: %v, limit: %v, offset: %v", current, pageSize, limit, offset)

		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
			"total":  total,
			"data":   users,
		})
	})

	// 监听并在 0.0.0.0:8080 上启动服务
	r.Run(":8080")
}
