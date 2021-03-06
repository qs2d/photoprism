package entity

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestNewCountry(t *testing.T) {
	t.Run("unknown country", func(t *testing.T) {
		country := NewCountry("", "")

		assert.Equal(t, &UnknownCountry, country)
	})
	t.Run("United States", func(t *testing.T) {
		country := NewCountry("us", "United States")

		assert.Equal(t, "USA", country.CountryName)
		assert.Equal(t, "usa", country.CountrySlug)
	})
	t.Run("Germany", func(t *testing.T) {
		country := NewCountry("de", "Germany")

		assert.Equal(t, "Germany", country.CountryName)
		assert.Equal(t, "germany", country.CountrySlug)
	})
}

func TestCountry_FirstOrCreate(t *testing.T) {
	t.Run("es", func(t *testing.T) {
		country := NewCountry("es", "spain")
		country.FirstOrCreate()
	})
}

func TestCountry_Name(t *testing.T) {
	country := NewCountry("xy", "Neverland")
	assert.Equal(t, "Neverland", country.Name())
}

func TestCountry_Code(t *testing.T) {
	country := NewCountry("xy", "Neverland")
	assert.Equal(t, "xy", country.Code())
}
