package model

type Transaction struct {
	Card           Card
	BillingAddress Address
}

type Card struct {
	FullName     string
	Number       string
	SecurityCode string
	ExpireMonth  uint8
	ExpireYear   uint16
}
