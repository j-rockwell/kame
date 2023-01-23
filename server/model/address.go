package model

type Address struct {
	Address1   string `json:"address_1" bson:"address_1"`
	Address2   string `json:"address_2" bson:"address_2"`
	City       string `json:"city" bson:"city"`
	State      string `json:"state" bson:"state"`
	Country    string `json:"country" bson:"country"`
	PostalCode string `json:"postal_code" bson:"postal_code"`
}
