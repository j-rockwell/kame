package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

const MENU_COLL_NAME string = "menus"
const MENU_BLACKOUT_COLL_NAME string = "menus_blackout"

type Menu struct {
	ID          primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Name        string             `json:"name" bson:"name"`
	Price       float32            `json:"price" bson:"price"`
	Active      bool               `json:"active" bson:"active"`
	CreatedBy   primitive.ObjectID `json:"created_by" bson:"created_by"`
	CreatedAt   time.Time          `json:"created_at" bson:"created_at"`
	LastUpdated time.Time          `json:"last_updated" bson:"last_updated"`
}

// MenuSanitized warps menu data and obfuscates when sending back to the client
type MenuSanitized struct {
	ID    primitive.ObjectID `json:"id"`
	Name  string             `json:"name"`
	Price float32            `json:"price"`
}

type MenuBlackout struct {
	ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Menu      primitive.ObjectID `json:"menu" bson:"menu"`
	CreatedBy primitive.ObjectID `json:"created_by" bson:"created_by"`
	CreatedAt time.Time          `json:"created_at" bson:"created_at"`
	Time      TableTime          `json:"time" bson:"time"`
	Group     TableGroup         `json:"group" bson:"group"`
}

type GetAvailableMenusResponse struct {
	Available []MenuSanitized `json:"available"`
}

type CreateMenuRequest struct {
	Name      string             `json:"name"`
	Price     float32            `json:"price"`
	Active    bool               `json:"active"`
	CreatedBy primitive.ObjectID `json:"created_by"`
}

type UpdateMenuRequest struct {
	Menu   primitive.ObjectID `json:"menu_id"`
	Name   string             `json:"name"`
	Price  float32            `json:"price"`
	Active bool               `json:"active"`
}
