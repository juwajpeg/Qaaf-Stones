"""Backend API tests for Q Stones B2B platform."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://himalayan-crystals.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"

EXPECTED_PRODUCT_NAMES = {
    "Edible Pink Salt", "Pink Salt Lamps", "Bath & Spa Salt",
    "Salt Bricks & Tiles", "Animal Salt Licks", "Gourmet Grinder Salt",
}


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Root ---
def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("name") == "Q Stones API"
    assert data.get("status") == "ok"


# --- Products ---
def test_list_products(client):
    r = client.get(f"{API}/products")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 6
    names = {p["name"] for p in data}
    assert names == EXPECTED_PRODUCT_NAMES
    for p in data:
        assert "_id" not in p
        for key in ("id", "sku", "category", "description", "grades", "granulation", "packaging", "moq", "image"):
            assert key in p


def test_get_product_by_id(client):
    r = client.get(f"{API}/products/edible-salt")
    assert r.status_code == 200
    data = r.json()
    assert data["id"] == "edible-salt"
    assert data["name"] == "Edible Pink Salt"
    assert "_id" not in data


def test_get_product_404(client):
    r = client.get(f"{API}/products/non-existent-xyz")
    assert r.status_code == 404


# --- RFQ ---
def test_rfq_submit_and_list(client):
    payload = {
        "company_name": "TEST_Acme Importers",
        "contact_name": "TEST_John Doe",
        "email": "test_buyer@example.com",
        "country": "Germany",
        "product": "Edible Pink Salt",
        "quantity_mt": "40",
    }
    r = client.post(f"{API}/rfq", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
    assert "created_at" in data
    assert data["company_name"] == payload["company_name"]
    assert "_id" not in data

    # List & ensure newly created RFQ is present and sorted desc
    lr = client.get(f"{API}/rfq")
    assert lr.status_code == 200
    items = lr.json()
    assert isinstance(items, list)
    assert any(i["id"] == data["id"] for i in items)
    for i in items:
        assert "_id" not in i
    if len(items) >= 2:
        assert items[0]["created_at"] >= items[1]["created_at"]


def test_rfq_validation_missing_field(client):
    # Missing required 'product'
    r = client.post(f"{API}/rfq", json={
        "company_name": "TEST_Co",
        "contact_name": "Jane",
        "email": "jane@example.com",
        "country": "France",
    })
    assert r.status_code == 422


def test_rfq_invalid_email(client):
    r = client.post(f"{API}/rfq", json={
        "company_name": "TEST_Co",
        "contact_name": "Jane",
        "email": "not-an-email",
        "country": "France",
        "product": "Edible Pink Salt",
    })
    assert r.status_code == 422


# --- Contact ---
def test_contact_submit_and_list(client):
    payload = {
        "name": "TEST_Sarah",
        "email": "test_sarah@example.com",
        "company": "TEST_Co",
        "subject": "Hello",
        "message": "We are interested in pink salt lamps",
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str)
    assert data["name"] == payload["name"]
    assert "_id" not in data

    lr = client.get(f"{API}/contact")
    assert lr.status_code == 200
    items = lr.json()
    assert any(i["id"] == data["id"] for i in items)
    for i in items:
        assert "_id" not in i


def test_contact_validation_missing_message(client):
    r = client.post(f"{API}/contact", json={
        "name": "TEST_NoMsg",
        "email": "nomsg@example.com",
    })
    assert r.status_code == 422
