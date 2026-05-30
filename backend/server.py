from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Q Stones API")
api_router = APIRouter(prefix="/api")

# Email service imported after env is loaded
from email_service import send_rfq_notification, send_contact_notification  # noqa: E402


# ---------- Models ----------
class RFQCreate(BaseModel):
    company_name: str
    contact_name: str
    email: EmailStr
    phone: Optional[str] = None
    country: str
    product: str
    grade: Optional[str] = None
    quantity_mt: Optional[str] = None
    packaging: Optional[str] = None
    destination_port: Optional[str] = None
    incoterms: Optional[str] = None
    target_price: Optional[str] = None
    message: Optional[str] = None


class RFQ(RFQCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    subject: Optional[str] = None
    message: str


class Contact(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class Product(BaseModel):
    id: str
    sku: str
    name: str
    category: str
    description: str
    grades: List[str]
    granulation: List[str]
    packaging: List[str]
    moq: str
    image: str


# ---------- Static product catalog ----------
PRODUCTS: List[Product] = [
    Product(
        id="edible-salt",
        sku="QS-ED-001",
        name="Edible Pink Salt",
        category="Food Grade",
        description="Premium 100% natural Himalayan pink salt sourced from the Khewra mine. Untreated, unrefined, rich in trace minerals.",
        grades=["Food Grade A", "Food Grade B", "Industrial"],
        granulation=["Powder (0.3-0.5mm)", "Fine (0.5-1mm)", "Coarse (1-3mm)", "Granular (2-5mm)", "Crystals (5-25mm)"],
        packaging=["25kg PP bags", "50kg PP bags", "1 MT jumbo bags", "Custom retail"],
        moq="20 MT (1x20ft container)",
        image="https://images.pexels.com/photos/7779878/pexels-photo-7779878.jpeg?auto=compress&cs=tinysrgb&w=900&h=675&fit=crop",
    ),
    Product(
        id="salt-lamps",
        sku="QS-LP-002",
        name="Pink Salt Lamps",
        category="Wellness",
        description="Hand-carved Himalayan salt lamps in natural and crafted shapes. Includes electrical fittings and bulbs.",
        grades=["Natural Shape", "Crafted (Pyramid, Sphere, Cube)", "USB Mini"],
        granulation=["1-2 kg", "2-3 kg", "3-5 kg", "5-7 kg", "7-10 kg", "10-15 kg"],
        packaging=["Single retail box", "Bulk carton", "Pallet"],
        moq="500 pcs",
        image="https://images.pexels.com/photos/6634303/pexels-photo-6634303.jpeg?auto=compress&cs=tinysrgb&w=900&h=675&fit=crop",
    ),
    Product(
        id="bath-salt",
        sku="QS-BT-003",
        name="Bath & Spa Salt",
        category="Wellness",
        description="Therapeutic grade pink salt for bath, spa and aromatherapy. Available in fine to coarse with optional essential oils.",
        grades=["Spa A", "Bath B", "Foot Soak"],
        granulation=["Fine (0.5-1mm)", "Medium (1-3mm)", "Coarse (2-5mm)"],
        packaging=["1kg pouches", "5kg buckets", "25kg bags", "Bulk"],
        moq="5 MT",
        image="https://images.pexels.com/photos/6690148/pexels-photo-6690148.jpeg?auto=compress&cs=tinysrgb&w=900&h=675&fit=crop",
    ),
    Product(
        id="salt-bricks",
        sku="QS-BR-004",
        name="Salt Bricks & Tiles",
        category="Construction",
        description="Architectural pink salt bricks and tiles for salt rooms, halotherapy chambers and decorative walls.",
        grades=["Standard", "Premium A", "Polished"],
        granulation=["8x4x2 inch", "8x4x1 inch", "12x6x2 inch", "Custom cuts"],
        packaging=["Wooden pallet", "Carton + foam"],
        moq="2,000 pcs",
        image="https://images.pexels.com/photos/10636881/pexels-photo-10636881.jpeg?auto=compress&cs=tinysrgb&w=900&h=675&fit=crop",
    ),
    Product(
        id="animal-licks",
        sku="QS-AL-005",
        name="Animal Salt Licks",
        category="Agriculture",
        description="Mineral-rich salt licks for cattle, horses, sheep and wildlife. Natural shapes or pressed blocks.",
        grades=["Natural", "Pressed"],
        granulation=["2-4 kg", "4-7 kg", "Custom"],
        packaging=["Loose in bags", "Individual carton"],
        moq="20 MT",
        image="https://images.pexels.com/photos/5507586/pexels-photo-5507586.jpeg?auto=compress&cs=tinysrgb&w=900&h=675&fit=crop",
    ),
    Product(
        id="gourmet-grinder",
        sku="QS-GR-006",
        name="Gourmet Grinder Salt",
        category="Food Grade",
        description="Premium crystal grade for retail grinders. Uniform 2-5mm crystals, extra clean.",
        grades=["Premium A", "Standard"],
        granulation=["2-5mm crystals"],
        packaging=["Bulk 25kg", "Private label retail"],
        moq="10 MT",
        image="https://images.pexels.com/photos/12174085/pexels-photo-12174085.jpeg?auto=compress&cs=tinysrgb&w=900&h=675&fit=crop",
    ),
]


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"name": "Q Stones API", "status": "ok"}


@api_router.get("/products", response_model=List[Product])
async def list_products():
    return PRODUCTS


@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    for p in PRODUCTS:
        if p.id == product_id:
            return p
    raise HTTPException(status_code=404, detail="Product not found")


@api_router.post("/rfq", response_model=RFQ)
async def submit_rfq(payload: RFQCreate, background_tasks: BackgroundTasks):
    rfq = RFQ(**payload.model_dump())
    doc = rfq.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.rfqs.insert_one(doc)
    # Fire-and-forget email notification to admin
    background_tasks.add_task(send_rfq_notification, doc)
    return rfq


@api_router.get("/rfq", response_model=List[RFQ])
async def list_rfqs():
    rfqs = await db.rfqs.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for r in rfqs:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return rfqs


@api_router.post("/contact", response_model=Contact)
async def submit_contact(payload: ContactCreate, background_tasks: BackgroundTasks):
    contact = Contact(**payload.model_dump())
    doc = contact.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contacts.insert_one(doc)
    background_tasks.add_task(send_contact_notification, doc)
    return contact


@api_router.get("/contact", response_model=List[Contact])
async def list_contacts():
    items = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for c in items:
        if isinstance(c.get('created_at'), str):
            c['created_at'] = datetime.fromisoformat(c['created_at'])
    return items


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
