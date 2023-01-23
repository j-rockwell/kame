package model

type Transaction struct {
	Card           Card    `json:"card" bson:"card"`
	BillingAddress Address `json:"billing_address" bson:"billing_address"`
}

type Card struct {
	FullName     string `json:"full_name" bson:"full_name"`
	Number       string `json:"number" bson:"number"`
	SecurityCode string `json:"security_code" bson:"security_code"`
	ExpireMonth  uint8  `json:"expire_mo" bson:"expire_mo"`
	ExpireYear   uint16 `json:"expire_yr" bson:"expire_yr"`
}
