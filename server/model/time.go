package model

type TableTime struct {
	Day   uint8  `json:"day" bson:"day"`
	Month uint8  `json:"month" bson:"month"`
	Year  uint16 `json:"year" bson:"year"`
}
